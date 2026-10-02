import React, { useState, useEffect } from 'react';
import { getCourses } from '../data/courses.js';

import { API_BASE_URL } from '../services/api';

const AddStudent = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!userId || !userName || !courseId) {
      setError('User ID (Email), User Name and Course are required.');
      return;
    }

    try {
      const selectedCourseObj = courses.find(c => String(c._id || c.id) === String(courseId));
      const courseTitle = selectedCourseObj?.title || 'Website Development';

      const response = await fetch(`${API_BASE_URL}/enrollments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: userName,
          email: userId,
          phoneNumber: 'Manual Admin Entry',
          gender: 'Other',
          city: 'Direct Admission',
          currentStatus: 'Student',
          currentProfessionOrCourse: 'Enrolled via Admin Panel',
          institutionOrCompany: 'Direct Admission',
          courseEnrolledFor: courseTitle,
          mode: 'Online',
          expectations: 'Enrolled directly via Creator Panel',
          declarationConfirmed: true,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage('Student added successfully!');
        setUserId('');
        setUserName('');
        setCourseId('');
      } else {
        setError(responseData.message || 'Failed to add student.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl p-6 space-y-5 bg-white border border-gray-200 rounded-md">
        <header>
          <p className="admin-eyebrow">ENROLLMENT</p>
          <h1 className="text-2xl font-bold text-gray-900">Add a student</h1>
          <p className="mt-1 text-sm text-gray-600">Create a direct course enrollment for a student.</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="student@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter user name"
              required
            />
          </div>
          <div>
            <label htmlFor="courseId" className="block mb-2 text-sm font-medium text-gray-700">
              Course
            </label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select a course</option>
              {courses.map(course => (
                  <option key={course._id || course.id} value={course._id || course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-emerald-700 rounded-md hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-200"
          >
            Add Student
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-green-600 dark:text-green-500">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-600 dark:text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default AddStudent;

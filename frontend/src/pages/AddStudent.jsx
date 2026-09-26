import React, { useState, useEffect } from 'react';
import { getCourses } from '../data/courses.js';

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
      setError('User ID, User Name and Course are required.');
      return;
    }

    try {
      const response = await fetch(`https://backend-1-bn9o.onrender.com/api/course/enroll/${courseId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:userId, name: userName }),
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Add Student</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              E-mail
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter user ID"
              required
            />
          </div>
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter user name"
              required
            />
          </div>
          <div>
            <label htmlFor="courseId" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Course
            </label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option value="" disabled>Select a course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ManageCourses.css';
import courseService from '../services/courseService';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getAllCourses();
            setCourses(data || []);
        } catch (error) {
            toast.error('An error occurred while fetching courses.');
            console.error('Fetch courses error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                await courseService.deleteCourse(courseId);
                setCourses(courses.filter(course => (course._id || course.id) !== courseId));
                toast.success('Course deleted successfully!');
            } catch (err) {
                console.error('Delete error:', err);
                toast.error('Failed to delete course');
            }
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading courses...</div>;
    }

    return (
        <div className="manage-courses-container">
            <h2>Manage Courses</h2>
            {courses.length === 0 ? (
                <p>No courses found. <Link to="/panel/add-course" className="text-blue-600 underline">Add a new course</Link> to get started.</p>
            ) : (
                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course._id || course.id} className="course-card">
                            <img src={course.image || '/images/Digital-Marketing.jpg'} alt={course.title} className="course-image" />
                            <div className="course-details">
                                <h3>{course.title}</h3>
                                <p className="course-description">{course.description ? course.description.substring(0, 100) + '...' : ''}</p>
                                <div className="course-meta">
                                    <span>${course.price}</span>
                                    <span>{course.category}</span>
                                </div>
                                <div className="course-actions">
                                    <Link to={`/panel/edit-course/${course._id || course.id}`} className="btn-edit">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(course._id || course.id)} className="btn-delete">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageCourses;
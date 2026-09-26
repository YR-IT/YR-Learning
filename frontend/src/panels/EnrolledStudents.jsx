import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import './EnrolledStudents.css';

const EnrolledStudents = () => {
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrolledStudents = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
                const response = await fetch(`${API_BASE_URL}/course/getstudents`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch enrolled students');
                }
                const data = await response.json();
                setEnrolledUsers(Array.isArray(data) ? data : data.enrolled_users || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading student data...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="enrolled-students-container">
            <h2>Enrolled Students</h2>
            <table className="students-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Enrolled Date</th>
                    </tr>
                </thead>
                <tbody>
                    {enrolledUsers.map((user, idx) => (
                        <tr key={user._id || user.id || idx}>
                            <td>{user.name || user.username || 'Student'}</td>
                            <td>{user.email || 'N/A'}</td>
                            <td>{user.course || 'Web Development'}</td>
                            <td>{user.enrolledDate || 'Recent'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledStudents;

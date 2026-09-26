import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import './CreatorPanel.css';

const CreatorPanel = () => {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('role') === 'admin' || !!localStorage.getItem('adminToken');
    });

    useEffect(() => {
        const hasAuth = localStorage.getItem('role') === 'admin' || !!localStorage.getItem('adminToken');
        setIsAdmin(hasAuth);
    }, []);

    if (!isAdmin) {
        return <div className="p-8 text-center text-gray-500">Checking authorization...</div>;
    }

    return (
        <div className="creator-panel">
            <aside className="panel-sidebar">
                <h2>Educator Panel</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={`/panel/add-course`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Add Course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/manage-courses`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Manage Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/enrolled-students`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Enrolled Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/earnings`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Earnings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/edit-banner`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                edit banner
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/panel/mobilebanners`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Mobile Banners
                            </NavLink>
                        </li>
                         <li>
                            <NavLink to={`/panel/add-student`} className={({ isActive }) => isActive ? "active-link" : ""}>
                                Add Student
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="panel-content">
                <Outlet />
            </main>
        </div>
    );
};

export default CreatorPanel;
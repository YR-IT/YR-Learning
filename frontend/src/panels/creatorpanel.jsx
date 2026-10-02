import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, FileText, Image, Plus, Smartphone, Users, UserPlus } from 'lucide-react';
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
                <div className="panel-brand">
                    <span className="panel-brand-mark"><BookOpen size={20} /></span>
                    <div>
                        <h2>YR Learning</h2>
                        <p>Admin workspace</p>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/panel/add-course" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Plus size={18} /> Add course
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/manage-courses" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <BookOpen size={18} /> Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/enrolled-students" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Users size={18} /> Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/articles" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <FileText size={18} /> Articles
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/edit-banner" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Image size={18} /> Banners
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/mobilebanners" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Smartphone size={18} /> Instructors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/panel/add-student" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <UserPlus size={18} /> Add student
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="panel-content">
                <div className="panel-content-inner">
                <Outlet />
                </div>
            </main>
        </div>
    );
};

export default CreatorPanel;
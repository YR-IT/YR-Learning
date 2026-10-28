import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import './EditInstructorBanner.css';

const resolveImageSrc = (img) => {
    if (!img) return '/images/trainer1.jpg';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/') || img.startsWith('data:')) {
        return img;
    }
    return `data:image/jpeg;base64,${img}`;
};

const InstructorManager = () => {
    const [instructors, setInstructors] = useState([]);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = API_BASE_URL;

    const fetchAllInstructors = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${baseUrl}/banner/getinstructor`);
            if (!response.ok) throw new Error('Failed to fetch instructors.');
            const data = await response.json();
            setInstructors(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllInstructors();
    }, []);

    const resetForm = () => {
        setEditingInstructor(null);
        setName('');
        setAbout('');
        setImage(null);
        setPreview('');
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = null;
    };

    const handleSelectEdit = (instructor) => {
        setEditingInstructor(instructor);
        setName(instructor.name || instructor.title || '');
        setAbout(instructor.about || instructor.link || '');
        setPreview(resolveImageSrc(instructor.image));
        setError('');
        window.scrollTo(0, 0);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle Add or Update (uploads directly from laptop to Cloudinary via backend)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !about || (!image && !editingInstructor)) {
            setError('Name, about, and a new image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('about', about);
        if (image) formData.append('image', image);

        const isEditMode = Boolean(editingInstructor);
        const url = isEditMode ? `${baseUrl}/banner/updateinstructor/${editingInstructor._id}` : `${baseUrl}/banner/addinstructor`;
        const method = isEditMode ? 'PUT' : 'POST';

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(url, { method, headers, body: formData });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'add'} instructor.`);
            resetForm();
            await fetchAllInstructors();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (instructorId) => {
        if (!window.confirm('Are you sure you want to delete this instructor?')) return;

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${baseUrl}/banner/deleteinstructor/${instructorId}`, { method: 'DELETE', headers });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || 'Failed to delete instructor.');
            await fetchAllInstructors();
            if (editingInstructor && editingInstructor._id === instructorId) {
                resetForm();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="instructor-manager-container">
            <h2>Manage Instructor Spotlight Cards</h2>

            <div className="form-card">
                <h3>{editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}</h3>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Instructor Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">About Instructor:</label>
                        <textarea
                            id="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Instructor Image (Upload from Laptop &rarr; Cloudinary):</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {preview && (
                        <div className="image-preview">
                            <img src={preview} alt="Preview" />
                        </div>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Uploading & Saving to Cloudinary...' : editingInstructor ? 'Update Instructor' : 'Add Instructor'}
                    </button>
                    {editingInstructor && (
                        <button type="button" onClick={resetForm} className="cancel-btn">
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>

            <div className="instructors-list">
                <h3>Existing Instructors</h3>
                {loading && <p>Loading instructors...</p>}
                {!loading && instructors.length === 0 && <p>No instructors found.</p>}
                <ul>
                    {instructors.map((inst) => (
                        <li key={inst._id} className="instructor-item">
                            <img src={resolveImageSrc(inst.image)} alt={inst.name} />
                            <div className="instructor-info">
                                <h4>{inst.name}</h4>
                                <p>{inst.about}</p>
                                {inst.image && inst.image.includes('cloudinary.com') && (
                                    <span className="text-xs text-green-400 bg-green-950/60 px-2 py-0.5 rounded border border-green-800 inline-block mt-1">Cloudinary Hosted</span>
                                )}
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleSelectEdit(inst)} disabled={loading} className="edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(inst._id)} disabled={loading} className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InstructorManager;

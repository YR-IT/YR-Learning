import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../services/api';
import './AddCourse.css';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        roadmap: '',
        price: '',
        category: '',
        instructor:'',
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value,      
            // title:javscript
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCourseData({
                ...courseData,
                thumbnail: file,
                // image:file type aa gya h
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // In a real application, you would send this data to your backend.
        // For this example, we'll just log it and show a success message.

        const formData = new FormData();
        for (const key in courseData) {
            formData.append(key, courseData[key]);
        }
         for (let pair of formData.entries()) {
                 console.log(`${pair[0]}:`, pair[1]);
                             }

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: courseData.title,
                    description: courseData.description,
                    price: Number(courseData.price) || 0,
                    category: courseData.category || 'Development',
                    instructor: courseData.instructor || 'YR Instructor',
                    image: thumbnailPreview || '/images/Digital-Marketing.jpg',
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Course creation failed');
            }

            toast.success('Course created successfully in database!');
            setCourseData({
                title: '',
                description: '',
                roadmap: '',
                price: '',
                category: '',
                instructor: '',
                thumbnail: null,
            });
            setThumbnailPreview('');
        } catch (error) {
            console.error('Add course error:', error);
            toast.error(error.message || 'Failed to create course');
        }
    };

    return (
        <div className="add-course-container">
            <h2>Create a New Course</h2>
             <form onSubmit={handleSubmit} className="add-course-form" encType="multipart/form-data" >
                <div className="form-group">
                    <label htmlFor="title">Course Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Course Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="roadmap">Roadmap</label>
                    <textarea
                        id="roadmap"
                        name="roadmap"
                        value={courseData.roadmap}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={courseData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={courseData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                 <div className="form-group">
                    <label htmlFor="instructor">Instructor Name</label>
                    <textarea
                        id="instructor"
                        name="instructor"
                        value={courseData.instructor}
                        onChange={handleChange}
                        rows="1"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Course Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleFileChange}
                        accept="image/*"
                        
                        required
                    />
                </div>
                

                {thumbnailPreview && (
                    <div className="thumbnail-preview">
                        <p>Thumbnail Preview:</p>
                        <img src={thumbnailPreview} alt="Thumbnail preview" />
                    </div>
                )}

                <button type="submit" className="submit-btn">Create Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
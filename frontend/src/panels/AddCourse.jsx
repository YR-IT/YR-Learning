import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../services/api';
import './AddCourse.css';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        instructor:'',
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [curriculumSections, setCurriculumSections] = useState([{ title: '', lessons: [''] }]);

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
        const sections = curriculumSections
            .map((section) => ({
                title: section.title.trim(),
                lessons: section.lessons.map((title) => ({ title: title.trim() })).filter((lesson) => lesson.title),
            }))
            .filter((section) => section.title || section.lessons.length);

        if (!sections.length || sections.some((section) => !section.title || !section.lessons.length)) {
            toast.error('Add a title and at least one topic to each curriculum section.');
            return;
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
                    curriculum: { sections },
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
                price: '',
                category: '',
                instructor: '',
                thumbnail: null,
            });
            setThumbnailPreview('');
            setCurriculumSections([{ title: '', lessons: [''] }]);
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
                    <label>Course Curriculum</label>
                    <div className="space-y-4">
                        {curriculumSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-3 rounded border border-gray-200 p-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        aria-label={`Section ${sectionIndex + 1} title`}
                                        placeholder={`Section ${sectionIndex + 1} title`}
                                        value={section.title}
                                        onChange={(event) => setCurriculumSections((current) => current.map((item, index) => index === sectionIndex ? { ...item, title: event.target.value } : item))}
                                        required
                                    />
                                    <button type="button" onClick={() => setCurriculumSections((current) => current.filter((_, index) => index !== sectionIndex))} disabled={curriculumSections.length === 1}>
                                        Remove section
                                    </button>
                                </div>
                                {section.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            aria-label={`Section ${sectionIndex + 1} topic ${lessonIndex + 1}`}
                                            placeholder={`Topic ${lessonIndex + 1}`}
                                            value={lesson}
                                            onChange={(event) => setCurriculumSections((current) => current.map((item, index) => index === sectionIndex ? { ...item, lessons: item.lessons.map((topic, topicIndex) => topicIndex === lessonIndex ? event.target.value : topic) } : item))}
                                            required
                                        />
                                        <button type="button" onClick={() => setCurriculumSections((current) => current.map((item, index) => index === sectionIndex ? { ...item, lessons: item.lessons.filter((_, topicIndex) => topicIndex !== lessonIndex) } : item))} disabled={section.lessons.length === 1}>
                                            Remove topic
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setCurriculumSections((current) => current.map((item, index) => index === sectionIndex ? { ...item, lessons: [...item.lessons, ''] } : item))}>
                                    Add topic
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setCurriculumSections((current) => [...current, { title: '', lessons: [''] }])}>
                            Add section
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price (Rs.)</label>
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
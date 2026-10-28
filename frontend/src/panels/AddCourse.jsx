import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../services/api';
import './AddCourse.css';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        instructor: '',
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [curriculumSections, setCurriculumSections] = useState([{ title: '', lessons: [''] }]);
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainerId, setSelectedTrainerId] = useState('');
    const [customInstructor, setCustomInstructor] = useState({
        name: '',
        role: '',
        bio: '',
    });

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/trainers`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setTrainers(data);
                    }
                }
            } catch (err) {
                console.warn('Could not fetch trainers for course dropdown:', err);
            }
        };
        fetchTrainers();
    }, []);

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
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Thumbnail must be smaller than 10 MB.');
                e.target.value = '';
                return;
            }
            setCourseData({
                ...courseData,
                thumbnail: file,
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
            let imageUrl = '/images/Digital-Marketing.jpg';

            if (courseData.thumbnail) {
                const uploadData = new FormData();
                uploadData.append('image', courseData.thumbnail);

                const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: uploadData,
                });

                const uploadResult = await uploadResponse.json().catch(() => ({}));
                if (!uploadResponse.ok || !uploadResult.url) {
                    throw new Error(uploadResult.message || 'Thumbnail upload failed');
                }
                imageUrl = uploadResult.url;
            }

            // Determine instructor payload
            let instructorPayload = 'YR Instructor';
            if (selectedTrainerId === 'custom') {
                instructorPayload = {
                    name: customInstructor.name.trim() || 'YR Instructor',
                    role: customInstructor.role.trim() || 'Course Instructor',
                    bio: customInstructor.bio.trim() || 'Expert instructor at YR Learning.',
                    avatar: '/images/trainer1.jpg',
                };
            } else if (selectedTrainerId) {
                const foundTrainer = trainers.find((t) => String(t._id) === String(selectedTrainerId));
                if (foundTrainer) {
                    instructorPayload = {
                        name: foundTrainer.name,
                        role: foundTrainer.role,
                        bio: foundTrainer.bio,
                        avatar: foundTrainer.avatar,
                        linkedin: foundTrainer.linkedin || '',
                        expertise: foundTrainer.expertise || [],
                    };
                }
            } else if (courseData.instructor) {
                instructorPayload = courseData.instructor.trim();
            }

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
                    instructor: instructorPayload,
                    image: imageUrl,
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
            setSelectedTrainerId('');
            setCustomInstructor({ name: '', role: '', bio: '' });
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
                    <label htmlFor="trainer-select">Course Instructor / Trainer</label>
                    <select
                        id="trainer-select"
                        value={selectedTrainerId}
                        onChange={(e) => {
                            const val = e.target.value;
                            setSelectedTrainerId(val);
                            if (val && val !== 'custom') {
                                const found = trainers.find((t) => String(t._id) === String(val));
                                if (found) {
                                    setCourseData((prev) => ({ ...prev, instructor: found.name }));
                                }
                            } else if (val === 'custom') {
                                setCourseData((prev) => ({ ...prev, instructor: customInstructor.name }));
                            }
                        }}
                        className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                    >
                        <option value="">-- Choose Trainer from Database --</option>
                        {trainers.map((t) => (
                            <option key={t._id} value={t._id}>
                                {t.name} ({t.role || 'Trainer'})
                            </option>
                        ))}
                        <option value="custom">+ Other / Enter Custom Instructor</option>
                    </select>

                    {/* Preview of chosen trainer */}
                    {selectedTrainerId && selectedTrainerId !== 'custom' && (() => {
                        const t = trainers.find((item) => String(item._id) === String(selectedTrainerId));
                        if (!t) return null;
                        return (
                            <div className="mt-3 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center gap-3">
                                <img
                                    src={t.avatar || '/images/trainer1.jpg'}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border border-blue-300"
                                    onError={(e) => { e.target.src = '/images/trainer1.jpg'; }}
                                />
                                <div className="text-sm">
                                    <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                                    <p className="text-blue-600 dark:text-blue-300 text-xs">{t.role}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-1">{t.bio}</p>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Custom trainer inputs */}
                    {selectedTrainerId === 'custom' && (
                        <div className="mt-3 p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-2">
                            <div>
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Custom Instructor Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    value={customInstructor.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setCustomInstructor((prev) => ({ ...prev, name }));
                                        setCourseData((prev) => ({ ...prev, instructor: name }));
                                    }}
                                    required
                                    className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Designation / Role</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Senior Cloud Architect"
                                    value={customInstructor.role}
                                    onChange={(e) => setCustomInstructor((prev) => ({ ...prev, role: e.target.value }))}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">About / Short Bio</label>
                                <textarea
                                    placeholder="Short bio of the instructor..."
                                    rows="2"
                                    value={customInstructor.bio}
                                    onChange={(e) => setCustomInstructor((prev) => ({ ...prev, bio: e.target.value }))}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                                />
                            </div>
                        </div>
                    )}
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
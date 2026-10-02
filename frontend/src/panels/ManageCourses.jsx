import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BookOpen, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import './ManageCourses.css';
import courseService from '../services/courseService';

const getInstructorName = (instructor) =>
    typeof instructor === 'string' ? instructor : instructor?.name || '';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All categories');

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
                setCourses(current => current.filter(course => (course._id || course.id) !== courseId));
                toast.success('Course deleted successfully!');
            } catch (err) {
                console.error('Delete error:', err);
                toast.error('Failed to delete course');
            }
        }
    };

    const categories = ['All categories', ...new Set(courses.map(course => course.category).filter(Boolean))];
    const filteredCourses = courses.filter(course => {
        const search = searchTerm.trim().toLowerCase();
        const matchesSearch = !search || [course.title, course.category, getInstructorName(course.instructor)]
            .some(value => value?.toLowerCase().includes(search));
        const matchesCategory = selectedCategory === 'All categories' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="manage-courses-container">
            <header className="manage-courses-header">
                <div>
                    <p className="admin-eyebrow">CATALOGUE</p>
                    <h1>Courses</h1>
                    <p className="admin-page-description">Review course details and keep your catalogue up to date.</p>
                </div>
                <Link to="/panel/add-course" className="admin-primary-action"><Plus size={17} /> Add course</Link>
            </header>

            <div className="course-summary-row">
                <div className="course-summary-icon"><BookOpen size={19} /></div>
                <div><span>Total courses</span><strong>{courses.length}</strong></div>
                <div className="course-summary-divider" />
                <div><span>Showing</span><strong>{filteredCourses.length}</strong></div>
            </div>

            <section className="course-table-panel" aria-label="Course catalogue">
                <div className="course-table-toolbar">
                    <div className="course-search-box">
                        <Search size={17} aria-hidden="true" />
                        <input
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                            placeholder="Search courses or instructors"
                            aria-label="Search courses or instructors"
                        />
                    </div>
                    <select value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)} aria-label="Filter by category">
                        {categories.map(category => <option key={category}>{category}</option>)}
                    </select>
                </div>

                <div className="course-table-scroll">
                    <table className="course-management-table">
                        <thead>
                            <tr><th>Course</th><th>Category</th><th>Instructor</th><th>Price</th><th><span className="sr-only">Actions</span></th></tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="course-table-message">Loading courses…</td></tr>
                            ) : filteredCourses.length === 0 ? (
                                <tr><td colSpan="5" className="course-table-message">
                                    {courses.length ? 'No courses match those filters.' : <>No courses yet. <Link to="/panel/add-course">Add your first course</Link>.</>}
                                </td></tr>
                            ) : filteredCourses.map(course => {
                                const courseId = course._id || course.id;
                                return (
                                    <tr key={courseId}>
                                        <td>
                                            <div className="course-table-title-cell">
                                                <img src={course.image || '/images/Digital-Marketing.jpg'} alt="" />
                                                <div><strong>{course.title}</strong><span>{course.description || 'No description provided'}</span></div>
                                            </div>
                                        </td>
                                        <td><span className="course-category-label">{course.category || 'Uncategorized'}</span></td>
                                        <td>{getInstructorName(course.instructor) || 'Not assigned'}</td>
                                        <td className="course-price">Rs. {Number(course.price || 0).toLocaleString('en-IN')}</td>
                                        <td>
                                            <div className="course-row-actions">
                                                <Link to={`/panel/edit-course/${courseId}`} aria-label={`Edit ${course.title}`} title="Edit course"><Pencil size={16} /></Link>
                                                <button onClick={() => handleDelete(courseId)} aria-label={`Delete ${course.title}`} title="Delete course"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ManageCourses;
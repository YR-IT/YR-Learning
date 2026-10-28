import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import {
    Award,
    Plus,
    Trash2,
    Edit3,
    UploadCloud,
    Sparkles,
    CheckCircle,
    X,
    Search,
    RefreshCw,
    AlertCircle,
    Linkedin,
    Mail,
    Users,
    BookOpen,
    Layers
} from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import './EditInstructorBanner.css';

const resolveImageSrc = (img) => {
    if (!img) return '/images/trainer1.jpg';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/') || img.startsWith('data:')) {
        return img;
    }
    return `data:image/jpeg;base64,${img}`;
};

const SUGGESTED_SKILLS = [
    'Java & DSA',
    'MERN Full-Stack',
    'Data Science & AI',
    'Machine Learning',
    'DevOps & Cloud',
    'UI/UX Design',
    'Cyber Security',
    'System Design'
];

const InstructorManager = () => {
    const [instructors, setInstructors] = useState([]);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [expertise, setExpertise] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const baseUrl = API_BASE_URL;

    // Fetch all trainers from backend
    const fetchAllInstructors = async () => {
        setLoading(true);
        setError('');
        try {
            // First attempt: /trainers
            const res = await fetch(`${baseUrl}/trainers`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setInstructors(data);
                    return;
                }
            }
            // Fallback: /banner/getinstructor
            const bannerRes = await fetch(`${baseUrl}/banner/getinstructor`);
            if (bannerRes.ok) {
                const data = await bannerRes.json();
                setInstructors(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch trainers.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllInstructors();
    }, []);

    // Reset Form
    const resetForm = () => {
        setEditingInstructor(null);
        setName('');
        setRole('');
        setBio('');
        setExpertise('');
        setLinkedin('');
        setEmail('');
        setImage(null);
        setPreview('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Populate for Edit
    const handleSelectEdit = (inst) => {
        setEditingInstructor(inst);
        setName(inst.name || inst.title || '');
        setRole(inst.role || 'Course Instructor');
        setBio(inst.bio || inst.about || '');
        setExpertise(Array.isArray(inst.expertise) ? inst.expertise.join(', ') : (inst.expertise || ''));
        setLinkedin(inst.linkedin || inst.link || '');
        setEmail(inst.email || '');
        setPreview(resolveImageSrc(inst.avatar || inst.image));
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // File selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Profile photo must be less than 10 MB.');
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Toggle suggested skill
    const handleSkillToggle = (skill) => {
        const currentSkills = expertise
            ? expertise.split(',').map((s) => s.trim()).filter(Boolean)
            : [];
        if (currentSkills.includes(skill)) {
            const next = currentSkills.filter((s) => s !== skill);
            setExpertise(next.join(', '));
        } else {
            const next = [...currentSkills, skill];
            setExpertise(next.join(', '));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || (!bio.trim() && !role.trim()) || (!image && !editingInstructor)) {
            setError('Please provide the trainer name, role or bio, and a photo.');
            toast.error('Name, designation, and profile photo are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('role', role.trim() || 'Technical Trainer');
        formData.append('bio', bio.trim());
        formData.append('about', bio.trim());
        formData.append('expertise', expertise.trim());
        formData.append('linkedin', linkedin.trim());
        formData.append('email', email.trim());

        if (image) {
            formData.append('avatar', image);
            formData.append('image', image);
        }

        const isEditMode = Boolean(editingInstructor);
        const url = isEditMode
            ? `${baseUrl}/trainers/${editingInstructor._id}`
            : `${baseUrl}/trainers`;
        const method = isEditMode ? 'PUT' : 'POST';

        setIsSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(url, { method, headers, body: formData });
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'add'} trainer.`);
            }

            toast.success(isEditMode ? 'Trainer updated successfully!' : 'New trainer added & synced to Cloudinary!');
            resetForm();
            await fetchAllInstructors();
        } catch (err) {
            setError(err.message || 'An error occurred while saving.');
            toast.error(err.message || 'Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete trainer
    const handleDelete = async (instructorId) => {
        if (!window.confirm('Are you sure you want to delete this trainer profile? It will also unlink from default banner rosters.')) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${baseUrl}/trainers/${instructorId}`, { method: 'DELETE', headers });
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete trainer.');
            }

            toast.success('Trainer removed successfully');
            await fetchAllInstructors();
            if (editingInstructor && editingInstructor._id === instructorId) {
                resetForm();
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Failed to delete trainer');
        } finally {
            setLoading(false);
        }
    };

    const filteredInstructors = instructors.filter((inst) => {
        const query = searchQuery.toLowerCase();
        const n = (inst.name || inst.title || '').toLowerCase();
        const r = (inst.role || '').toLowerCase();
        const b = (inst.bio || inst.about || '').toLowerCase();
        const exp = Array.isArray(inst.expertise) ? inst.expertise.join(' ').toLowerCase() : (inst.expertise || '').toLowerCase();
        return n.includes(query) || r.includes(query) || b.includes(query) || exp.includes(query);
    });

    return (
        <div className="trainer-manager-container">
            {/* Page Header */}
            <div className="trainer-page-header">
                <div>
                    <span className="trainer-badge">
                        <Award size={13} className="text-emerald-600" />
                        DATABASE TRAINER MANAGEMENT
                    </span>
                    <h1>Manage Trainers &amp; Instructors</h1>
                    <p>
                        Add, update, or remove technical trainers and instructors stored in the MongoDB database.
                        Changes automatically synchronize with Course instructor dropdowns, the homepage Instructor Showcase, and mobile banners.
                    </p>
                </div>
                <div className="trainer-stats-row">
                    <div className="stat-pill">
                        <Users size={16} className="text-emerald-600" />
                        <span><strong>{instructors.length}</strong> Trainers Active</span>
                    </div>
                    <div className="stat-pill">
                        <CheckCircle size={16} className="text-blue-500" />
                        <span><strong>Cloudinary</strong> CDN</span>
                    </div>
                    <div className="stat-pill">
                        <BookOpen size={16} className="text-indigo-500" />
                        <span><strong>Auto-Linked</strong> to Courses</span>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className={`trainer-form-card ${editingInstructor ? 'editing-mode' : ''}`}>
                <div className="card-top-bar">
                    <div className="flex items-center gap-2">
                        <div className={`mode-indicator ${editingInstructor ? 'editing' : 'adding'}`}>
                            {editingInstructor ? <Edit3 size={16} /> : <Plus size={16} />}
                        </div>
                        <div>
                            <h2>{editingInstructor ? 'Edit Trainer Profile' : 'Add New Trainer / Instructor'}</h2>
                            <p className="card-subtitle">
                                {editingInstructor
                                    ? `Updating instructor: ${name || editingInstructor.name || editingInstructor._id}`
                                    : 'Register a new industry expert or faculty member in the system'}
                            </p>
                        </div>
                    </div>
                    {editingInstructor && (
                        <button type="button" onClick={resetForm} className="btn-cancel-edit">
                            <X size={15} /> Cancel Edit
                        </button>
                    )}
                </div>

                {error && (
                    <div className="form-error-alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="trainer-modern-form">
                    <div className="form-grid-2">
                        {/* Name */}
                        <div className="form-field-group">
                            <label htmlFor="trainer-name">
                                Trainer Full Name <span className="req">*</span>
                            </label>
                            <input
                                id="trainer-name"
                                type="text"
                                placeholder="e.g. Gauri Singhal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <span className="field-hint">The instructor's official full name</span>
                        </div>

                        {/* Role / Designation */}
                        <div className="form-field-group">
                            <label htmlFor="trainer-role">
                                Designation / Role <span className="req">*</span>
                            </label>
                            <input
                                id="trainer-role"
                                type="text"
                                placeholder="e.g. DSA & Java Lead Instructor, Ex-Infosys"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                            <span className="field-hint">Professional headline displayed on cards and course view</span>
                        </div>
                    </div>

                    {/* Bio / About */}
                    <div className="form-field-group">
                        <label htmlFor="trainer-bio">
                            About / Biography <span className="req">*</span>
                        </label>
                        <textarea
                            id="trainer-bio"
                            placeholder="Detailed bio covering past corporate experience, tech stack expertise, mentorship track record..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={3}
                            required
                        />
                        <span className="field-hint">Clear summary of the instructor's credentials and impact</span>
                    </div>

                    {/* Skills / Expertise */}
                    <div className="form-field-group">
                        <label htmlFor="trainer-expertise">
                            Expertise &amp; Skills (Comma separated)
                        </label>
                        <input
                            id="trainer-expertise"
                            type="text"
                            placeholder="e.g. Java, Data Structures, Algorithms, System Design"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                        />
                        <div className="quick-tags-chips">
                            <span className="chips-label">Popular Skills:</span>
                            {SUGGESTED_SKILLS.map((skill) => {
                                const active = expertise.toLowerCase().includes(skill.toLowerCase());
                                return (
                                    <button
                                        key={skill}
                                        type="button"
                                        className={`tag-chip-btn ${active ? 'active' : ''}`}
                                        onClick={() => handleSkillToggle(skill)}
                                    >
                                        {active ? '✓ ' : '+ '}
                                        {skill}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-grid-2">
                        {/* LinkedIn */}
                        <div className="form-field-group">
                            <label htmlFor="trainer-linkedin">
                                LinkedIn Profile URL
                            </label>
                            <div className="input-with-icon">
                                <Linkedin size={16} className="input-icon" />
                                <input
                                    id="trainer-linkedin"
                                    type="url"
                                    placeholder="https://www.linkedin.com/in/username"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-field-group">
                            <label htmlFor="trainer-email">
                                Official Email Address
                            </label>
                            <div className="input-with-icon">
                                <Mail size={16} className="input-icon" />
                                <input
                                    id="trainer-email"
                                    type="email"
                                    placeholder="trainer@yrelearning.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="form-field-group">
                        <label>
                            Profile Photo <span className="req">{!editingInstructor ? '*' : ''}</span>
                        </label>
                        <div
                            className="trainer-upload-area"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden-file-input"
                            />
                            <div className="avatar-preview-box">
                                <img
                                    src={preview || '/images/trainer1.jpg'}
                                    alt="Preview"
                                    onError={(e) => { e.target.src = '/images/trainer1.jpg'; }}
                                />
                                <div className="avatar-hover-overlay">
                                    <UploadCloud size={20} />
                                </div>
                            </div>
                            <div className="upload-instructions">
                                <p>
                                    <strong>Click to choose profile picture from laptop</strong> or drag here
                                </p>
                                <span>
                                    Recommended: Square ratio 400x400 (JPG, PNG, WebP up to 10MB) &rarr; Directly saved to Cloudinary CDN
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="form-submit-actions">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary-save"
                        >
                            {isSubmitting ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" />
                                    <span>Uploading &amp; Saving to Cloudinary...</span>
                                </>
                            ) : editingInstructor ? (
                                <>
                                    <CheckCircle size={18} />
                                    <span>Update Trainer Changes</span>
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    <span>Register New Trainer</span>
                                </>
                            )}
                        </button>

                        {editingInstructor && (
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={isSubmitting}
                                className="btn-secondary-cancel"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Existing Trainers List */}
            <div className="existing-trainers-section">
                <div className="section-header-bar">
                    <div>
                        <h2>Live Trainers in Database ({instructors.length})</h2>
                        <p>Faculty profiles synced across courses and the homepage showcase</p>
                    </div>

                    <div className="search-box">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Filter by name, role, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button type="button" onClick={() => setSearchQuery('')} className="clear-search">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="loading-state">
                        <RefreshCw size={24} className="animate-spin text-emerald-600 mb-2" />
                        <p>Loading trainers from backend...</p>
                    </div>
                )}

                {!loading && filteredInstructors.length === 0 && (
                    <div className="empty-state-card">
                        <Users size={44} className="text-gray-400 mb-2" />
                        <h3>No trainers found</h3>
                        <p>{searchQuery ? 'No trainer matches your search query.' : 'No trainers have been registered yet.'}</p>
                    </div>
                )}

                {!loading && filteredInstructors.length > 0 && (
                    <div className="modern-trainers-grid">
                        {filteredInstructors.map((inst, index) => {
                            const imgUrl = resolveImageSrc(inst.avatar || inst.image);
                            const isCloudinary = (inst.avatar || inst.image || '').includes('cloudinary.com');
                            const expList = Array.isArray(inst.expertise)
                                ? inst.expertise
                                : (inst.expertise ? inst.expertise.split(',').map((s) => s.trim()).filter(Boolean) : []);

                            return (
                                <div key={inst._id || index} className="modern-trainer-card">
                                    <div>
                                        <div className="trainer-card-header">
                                            <div className="card-avatar-wrap">
                                                <img
                                                    src={imgUrl}
                                                    alt={inst.name || 'Trainer'}
                                                    className="card-avatar-img"
                                                    onError={(e) => { e.target.src = '/images/trainer1.jpg'; }}
                                                />
                                            </div>
                                            <div className="card-headline-wrap">
                                                <h3 className="trainer-card-name">{inst.name || inst.title}</h3>
                                                <p className="trainer-card-role">{inst.role || 'Course Instructor'}</p>
                                                <div className="badge-row">
                                                    {isCloudinary && (
                                                        <span className="badge-cloudinary">
                                                            <CheckCircle size={10} /> Cloudinary
                                                        </span>
                                                    )}
                                                    <span className="badge-synced">
                                                        Synced
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="trainer-card-bio">
                                            {inst.bio || inst.about || 'Dedicated educator and tech mentor.'}
                                        </p>

                                        {expList.length > 0 && (
                                            <div className="trainer-expertise-tags">
                                                {expList.slice(0, 4).map((skill, sIdx) => (
                                                    <span key={sIdx} className="exp-pill">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {expList.length > 4 && (
                                                    <span className="exp-more">+{expList.length - 4}</span>
                                                )}
                                            </div>
                                        )}

                                        <div className="trainer-social-links">
                                            {inst.linkedin && (
                                                <a
                                                    href={inst.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="social-chip linkedin"
                                                >
                                                    <Linkedin size={12} /> LinkedIn
                                                </a>
                                            )}
                                            {inst.email && (
                                                <a
                                                    href={`mailto:${inst.email}`}
                                                    className="social-chip email"
                                                >
                                                    <Mail size={12} /> Email
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="trainer-card-actions">
                                        <button
                                            type="button"
                                            onClick={() => handleSelectEdit(inst)}
                                            className="btn-edit-action"
                                        >
                                            <Edit3 size={14} /> Edit Profile
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(inst._id)}
                                            className="btn-delete-action"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorManager;

import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { 
    Image as ImageIcon, 
    Plus, 
    Trash2, 
    Edit3, 
    ExternalLink, 
    UploadCloud, 
    Sparkles, 
    CheckCircle, 
    Link as LinkIcon, 
    X, 
    Layers,
    Search,
    RefreshCw,
    AlertCircle
} from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import './EditBanner.css';

const resolveImageSrc = (img) => {
    if (!img) return '/images/hero-tech.jpg';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/') || img.startsWith('data:')) {
        return img;
    }
    return `data:image/jpeg;base64,${img}`;
};

const QUICK_LINKS = [
    { label: 'All Courses', url: '/courses' },
    { label: 'Enroll Page', url: '/enroll' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact', url: '/contact' },
];

const EditBanner = () => {
    const [banners, setBanners] = useState([]);
    const [editingBanner, setEditingBanner] = useState(null);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const baseUrl = API_BASE_URL;

    // Fetch promotional banners
    const fetchAllBanners = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${baseUrl}/banner/getbanner`);
            if (!response.ok) throw new Error('Failed to load promotional banners.');
            const data = await response.json();
            setBanners(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Could not connect to backend.');
            toast.error(err.message || 'Failed to fetch banners');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBanners();
    }, []);

    // Reset form fields
    const resetForm = () => {
        setEditingBanner(null);
        setTitle('');
        setLink('');
        setImage(null);
        setPreview('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Populate form for editing
    const handleSelectEdit = (banner) => {
        setEditingBanner(banner);
        setTitle(banner.title || '');
        setLink(banner.link || '');
        setPreview(resolveImageSrc(banner.image));
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Image size must be less than 10 MB.');
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Submit handler (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || (!image && !editingBanner)) {
            setError('Please provide a banner title and an image.');
            toast.error('Title and banner image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('link', link.trim() || '/courses');
        formData.append('type', 'banner');
        if (image) {
            formData.append('banner', image);
            formData.append('image', image);
        }

        const isEditMode = Boolean(editingBanner);
        const url = isEditMode
            ? `${baseUrl}/banner/updatebanner/${editingBanner._id}`
            : `${baseUrl}/banner/addbanner`;
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
                throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'create'} banner.`);
            }

            toast.success(isEditMode ? 'Banner updated successfully!' : 'New banner published to homepage!');
            resetForm();
            await fetchAllBanners();
        } catch (err) {
            setError(err.message || 'An error occurred while saving.');
            toast.error(err.message || 'Operation failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete handler
    const handleDelete = async (bannerId) => {
        if (!window.confirm('Are you sure you want to delete this promotional banner?')) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${baseUrl}/banner/deletebanner/${bannerId}`, {
                method: 'DELETE',
                headers,
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete banner.');
            }

            toast.success('Banner deleted successfully!');
            await fetchAllBanners();
            if (editingBanner && editingBanner._id === bannerId) {
                resetForm();
            }
        } catch (err) {
            toast.error(err.message || 'Failed to delete banner');
        } finally {
            setLoading(false);
        }
    };

    const filteredBanners = banners.filter((b) =>
        (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.link || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="banner-manager-container">
            {/* Header section */}
            <div className="banner-page-header">
                <div>
                    <span className="banner-badge">
                        <Sparkles size={13} className="text-amber-500 animate-pulse" />
                        HOMEPAGE HERO CAMPAIGNS
                    </span>
                    <h1>Manage Promotional Banners</h1>
                    <p>
                        Create, update, and manage the promotional hero carousel banners shown at the top of the website.
                        Uploaded images are securely stored on Cloudinary and synced in MongoDB.
                    </p>
                </div>
                <div className="banner-stats-row">
                    <div className="stat-pill">
                        <Layers size={16} className="text-emerald-500" />
                        <span><strong>{banners.length}</strong> Banners Live</span>
                    </div>
                    <div className="stat-pill">
                        <CheckCircle size={16} className="text-blue-500" />
                        <span><strong>Cloudinary</strong> Enabled</span>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="banner-form-card">
                <div className="card-top-bar">
                    <div className="flex items-center gap-2">
                        <div className={`mode-indicator ${editingBanner ? 'editing' : 'adding'}`}>
                            {editingBanner ? <Edit3 size={16} /> : <Plus size={16} />}
                        </div>
                        <div>
                            <h2>{editingBanner ? 'Edit Banner Details' : 'Add New Promotional Banner'}</h2>
                            <p className="card-subtitle">
                                {editingBanner 
                                    ? `Updating banner ID: ${editingBanner._id}` 
                                    : 'Upload a new high-impact banner for the home slider'}
                            </p>
                        </div>
                    </div>
                    {editingBanner && (
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

                <form onSubmit={handleSubmit} className="banner-modern-form">
                    <div className="form-grid-2">
                        {/* Title input */}
                        <div className="form-field-group">
                            <label htmlFor="banner-title">
                                Banner Headline / Title <span className="req">*</span>
                            </label>
                            <input
                                id="banner-title"
                                type="text"
                                placeholder="e.g. Master High-Impact Tech Skills & Accelerate Your Career"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <span className="field-hint">Engaging headline displayed across the banner slide</span>
                        </div>

                        {/* Link input */}
                        <div className="form-field-group">
                            <label htmlFor="banner-link">
                                Destination Link <span className="req">*</span>
                            </label>
                            <div className="input-with-icon">
                                <LinkIcon size={16} className="input-icon" />
                                <input
                                    id="banner-link"
                                    type="text"
                                    placeholder="/courses or https://example.com"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            {/* Quick link chips */}
                            <div className="quick-links-chips">
                                <span className="chips-label">Quick Links:</span>
                                {QUICK_LINKS.map((ql) => (
                                    <button
                                        key={ql.url}
                                        type="button"
                                        className={`chip-btn ${link === ql.url ? 'active' : ''}`}
                                        onClick={() => setLink(ql.url)}
                                    >
                                        {ql.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="form-field-group">
                        <label>
                            Banner Image (Desktop & Tablet Hero Format) <span className="req">{!editingBanner ? '*' : ''}</span>
                        </label>
                        <div
                            className={`banner-upload-dropzone ${preview ? 'has-preview' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                id="banner-file"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden-file-input"
                            />

                            {preview ? (
                                <div className="preview-container">
                                    <img src={preview} alt="Banner Preview" className="preview-image" />
                                    <div className="preview-overlay">
                                        <UploadCloud size={24} />
                                        <span>Click to Change Image</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="dropzone-placeholder">
                                    <div className="upload-icon-circle">
                                        <UploadCloud size={28} />
                                    </div>
                                    <p className="upload-prompt">
                                        <strong>Click to browse from laptop</strong> or drag image here
                                    </p>
                                    <span className="upload-specs">
                                        Recommended: 1920x800 or 1600x600 (JPG, PNG, WebP up to 10MB) &rarr; Directly saved to Cloudinary
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="form-submit-actions">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`btn-primary-save ${isSubmitting ? 'submitting' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" />
                                    <span>Uploading & Saving to Cloudinary...</span>
                                </>
                            ) : editingBanner ? (
                                <>
                                    <CheckCircle size={18} />
                                    <span>Update Banner Changes</span>
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    <span>Publish New Banner</span>
                                </>
                            )}
                        </button>

                        {editingBanner && (
                            <button type="button" onClick={resetForm} disabled={isSubmitting} className="btn-secondary-cancel">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Existing Banners Section */}
            <div className="existing-banners-section">
                <div className="section-header-bar">
                    <div>
                        <h2>Live Homepage Banners ({banners.length})</h2>
                        <p>Currently configured banners that rotate in the supreme hero carousel</p>
                    </div>

                    <div className="search-box">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Filter banners by title or link..."
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
                        <RefreshCw size={24} className="animate-spin text-emerald-500 mb-2" />
                        <p>Loading banners from backend...</p>
                    </div>
                )}

                {!loading && filteredBanners.length === 0 && (
                    <div className="empty-state-card">
                        <ImageIcon size={44} className="text-gray-400 mb-2" />
                        <h3>No banners found</h3>
                        <p>{searchQuery ? 'No banner matches your search term.' : 'No promotional banners have been created yet.'}</p>
                    </div>
                )}

                {!loading && filteredBanners.length > 0 && (
                    <div className="modern-banners-grid">
                        {filteredBanners.map((banner, index) => {
                            const imgUrl = resolveImageSrc(banner.image);
                            const isCloudinary = banner.image && banner.image.includes('cloudinary.com');

                            return (
                                <div key={banner._id || index} className="modern-banner-card">
                                    <div className="banner-thumbnail-wrap">
                                        <img
                                            src={imgUrl}
                                            alt={banner.title}
                                            className="banner-img"
                                            onError={(e) => { e.target.src = '/images/hero-tech.jpg'; }}
                                        />
                                        <div className="banner-top-badges">
                                            <span className="badge-slide-order">Slide #{index + 1}</span>
                                            {isCloudinary && (
                                                <span className="badge-cloudinary">
                                                    <CheckCircle size={10} /> Cloudinary
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="banner-card-body">
                                        <h3 className="banner-card-title">{banner.title}</h3>
                                        
                                        <div className="banner-card-meta">
                                            <span className="meta-link">
                                                <ExternalLink size={13} />
                                                <span className="truncate">{banner.link || '/courses'}</span>
                                            </span>
                                        </div>

                                        <div className="banner-card-actions">
                                            <button
                                                type="button"
                                                onClick={() => handleSelectEdit(banner)}
                                                className="btn-edit-action"
                                            >
                                                <Edit3 size={14} /> Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(banner._id)}
                                                className="btn-delete-action"
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
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

export default EditBanner;
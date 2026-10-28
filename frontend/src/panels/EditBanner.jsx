import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import './EditBanner.css';

const resolveImageSrc = (img) => {
    if (!img) return '/images/hero-tech.jpg';
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/') || img.startsWith('data:')) {
        return img;
    }
    return `data:image/jpeg;base64,${img}`;
};

const BannerManager = () => {
    const [banners, setBanners] = useState([]);
    const [editingBanner, setEditingBanner] = useState(null);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = API_BASE_URL;

    // Fetch all banners
    const fetchAllBanners = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${baseUrl}/banner/getbanner`);
            if (!response.ok) throw new Error('Failed to fetch banners.');
            const data = await response.json();
            setBanners(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBanners();
    }, []);

    // Reset form fields and state
    const resetForm = () => {
        setEditingBanner(null);
        setTitle('');
        setLink('');
        setImage(null);
        setPreview('');
        const fileInput = document.getElementById('banner');
        if (fileInput) fileInput.value = null;
    };

    // Set form to edit a specific banner
    const handleSelectEdit = (banner) => {
        setEditingBanner(banner);
        setTitle(banner.title);
        setLink(banner.link || '');
        setPreview(resolveImageSrc(banner.image));
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
        if (!title || (!image && !editingBanner)) {
            setError('Title and a new image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        if (image) formData.append('banner', image);

        const isEditMode = Boolean(editingBanner);
        const url = isEditMode ? `${baseUrl}/banner/updatebanner/${editingBanner._id}` : `${baseUrl}/banner/addbanner`;
        const method = isEditMode ? 'PUT' : 'POST';
      
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(url, { method, headers, body: formData });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'add'} banner.`);
            resetForm();
            await fetchAllBanners();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Delete
    const handleDelete = async (bannerId) => {
        if (!window.confirm('Are you sure you want to delete this banner?')) return;
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
            const headers = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${baseUrl}/banner/deletebanner/${bannerId}`, { method: 'DELETE', headers });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.message || 'Failed to delete banner.');
            await fetchAllBanners();
            if (editingBanner && editingBanner._id === bannerId) {
                resetForm();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="banner-manager-container">
            <h2>Manage Promotional Banners</h2>

            <div className="form-card">
                <h3>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Banner Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="banner-link">Banner Link</label>
                        <input id="banner-link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="banner">Banner Image (Upload from Laptop &rarr; Cloudinary)</label>
                        {preview && <img src={preview} alt="Preview" className="image-preview" />}
                        <input id="banner" type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={loading}>{loading ? 'Uploading & Saving to Cloudinary...' : (editingBanner ? 'Update Banner' : 'Add Banner')}</button>
                        {editingBanner && <button type="button" onClick={resetForm} disabled={loading}>Cancel Edit</button>}
                    </div>
                </form>
            </div>

            <h3>Existing Banners</h3>
            {loading && banners.length === 0 && <p>Loading Banners...</p>}
            <div className="banners-list">
                {banners.map((banner) => (
                    <div key={banner._id} className="banner-card">
                        <img src={resolveImageSrc(banner.image)} alt={banner.title} />
                        <div className="banner-info">
                            <p className="font-semibold">{banner.title}</p>
                            {banner.image && banner.image.includes('cloudinary.com') && (
                                <span className="text-xs text-green-400 bg-green-950/60 px-2 py-0.5 rounded border border-green-800">Cloudinary Hosted</span>
                            )}
                            <div className="banner-actions mt-2">
                                <button onClick={() => handleSelectEdit(banner)} disabled={loading}>Edit</button>
                                <button onClick={() => handleDelete(banner._id)} disabled={loading} className="delete-button">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerManager;
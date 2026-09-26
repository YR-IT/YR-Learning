import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import './EditBanner.css';

const BannerManager = () => {
    const [banners, setBanners] = useState([]);
    const [editingBanner, setEditingBanner] = useState(null);
    const [title, setTitle] = useState('');
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
        setImage(null);
        setPreview('');
        const fileInput = document.getElementById('image-input');
        if (fileInput) fileInput.value = null;
    };

    // Set form to edit a specific banner
    const handleSelectEdit = (banner) => {
        setEditingBanner(banner);
        setTitle(banner.title);
        setPreview(`data:image/jpeg;base64,${banner.image}`);
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

    // Handle Add or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || (!image && !editingBanner)) {
            setError('Title and a new image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        if (image) formData.append('banner', image);

        const isEditMode = Boolean(editingBanner);
        const url = isEditMode ? `${baseUrl}/banner/updatebanner/${editingBanner._id}` : `${baseUrl}/banner/addbanner`;
        const method = isEditMode ? 'PUT' : 'POST';
      
        setLoading(true);
        setError('');

        try {
            const response = await fetch(url, { method, body: formData });
            if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} banner.`);
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
            const response = await fetch(`${baseUrl}/banner/deletebanner/${bannerId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete banner.');
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
        <div className="banner-panel">
            <h2>Manage Banners</h2>
            {error && <p className="error">{error}</p>}

            <div className="edit-banner-panel" style={{ marginBottom: '2rem' }}>
                <h3>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
                <form onSubmit={handleSubmit} className="edit-banner-form">
                    <div className="form-group">
                        <label htmlFor="title">Banner Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image-input">Banner Image</label>
                        {preview && <img src={preview} alt="Preview" className="image-preview" />}
                        <input id="banner" type="file" onChange={handleFileChange} accept="banner/*" />
                    </div>
                    <div className="form-actions">
                        <button type="submit" disabled={loading}>{loading ? 'Saving...' : (editingBanner ? 'Update Banner' : 'Add Banner')}</button>
                        {editingBanner && <button type="button" onClick={resetForm} disabled={loading}>Cancel Edit</button>}
                    </div>
                </form>
            </div>

            <h3>Existing Banners</h3>
            {loading && banners.length === 0 && <p>Loading Banners...</p>}
            <div className="banners-list">
                {banners.map((banner) => (
                    <div key={banner._id} className="banner-card">
                        <img src={`data:image/jpeg;base64,${banner.image}`} alt={banner.title} />
                        <div className="banner-info">
                            <p>{banner.title}</p>
                            <div className="banner-actions">
                                <button onClick={() => handleSelectEdit(banner)} disabled={loading}><p className='rounded-lg bg-slate-300 text-xl w-40'>Edit</p></button>
                                <br />
                                <br />
                                <button onClick={() => handleDelete(banner._id)} disabled={loading} className="delete-button"><p className='rounded-lg bg-blue-200   text-xl w-40'>Delete</p></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerManager;
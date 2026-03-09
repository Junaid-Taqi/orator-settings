import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../Services/Constants/Constants';

const BrandingLogo = ({ user, detailsData, detailsLoading, fetchDetails, detailsError }) => {
    // States for three different uploads
    const [primaryLogoPreview, setPrimaryLogoPreview] = useState(null);
    const [primaryLogoFile, setPrimaryLogoFile] = useState(null);
    const [secondaryLogo, setSecondaryLogo] = useState(null);
    const [favicon, setFavicon] = useState(null);

    const [existingData, setExistingData] = useState({
        siteName: '',
        webUrl: '',
        email: '',
        phoneNo: ''
    });

    const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error' | 'saving'
    const [message, setMessage] = useState('');

    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    const faviconRef = useRef(null);

    const groupId = user?.groups?.[0]?.id;
    const userId = user?.userId;

    useEffect(() => {
        if (detailsData) {
            setExistingData({
                siteName: detailsData.siteName || '',
                webUrl: detailsData.webUrl || '',
                email: detailsData.email || '',
                phoneNo: detailsData.phoneNo || ''
            });

            if (detailsData.logoUrl) {
                setPrimaryLogoPreview(detailsData.logoUrl);
            }
        }
    }, [detailsData]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setPrimaryLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPrimaryLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupId || !userId) return;

        setStatus('saving');
        setMessage('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const payload = new FormData();
            payload.append('groupId', groupId);
            payload.append('userId', userId);
            payload.append('siteName', existingData.siteName);
            payload.append('webUrl', existingData.webUrl);
            payload.append('email', existingData.email);
            payload.append('phoneNo', existingData.phoneNo);

            if (primaryLogoFile) {
                payload.append('logo', primaryLogoFile);
            }

            const response = await axios.post(
                `${serverUrl}/o/settingsManagement/saveMunicipalityDetails`,
                payload,
                config
            );

            if (response.data?.success) {
                setStatus('success');
                setMessage('Logo saved successfully!');
                setPrimaryLogoFile(null); // Clear the file state after saving
                if (fetchDetails) fetchDetails();
            } else {
                setStatus('error');
                setMessage(response.data?.message || 'Failed to save logo.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Network error saving logo.');
            console.error(err);
        }
    };

    return (
        <section className="container-fluid p-5 branding-section min-vh-100 text-white">
            <h2 className="fw-bold mb-1">Branding & Logos</h2>
            <p className="text-info opacity-75 mb-4">Upload and manage logos used across templates</p>

            {detailsLoading ? (
                <div className="text-center p-4">Loading details...</div>
            ) : detailsError ? (
                <div className="alert alert-danger mb-4">{detailsError}</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {message && (
                        <div className={`alert ${status === 'error' ? 'alert-danger' : 'alert-success'} mb-4`}>
                            {message}
                        </div>
                    )}

                    {/* --- PRIMARY LOGO SECTION --- */}
                    <div className="main-card p-4 rounded-4 shadow-lg mb-5">
                        <h4 className="mb-1 fw-semibold">Municipality Logo</h4>
                        <p className="small text-secondary mb-4">Used as default cover image and in template headers</p>
                        <div className="row g-4 mt-2">
                            <div className="col-md-6">
                                <label className="text-info small fw-bold mb-2 d-block">Current Logo</label>
                                <div className="upload-box d-flex align-items-center justify-content-center overflow-hidden">
                                    {primaryLogoPreview ? (
                                        <img src={primaryLogoPreview} className="img-fluid p-3 h-100" alt="Primary" />
                                    ) : (
                                        <div className="text-center">
                                            <i className="bi bi-building fs-1 text-info opacity-50 d-block"></i>
                                            <span className="text-info small">No logo uploaded</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="text-info small fw-bold mb-2 d-block">Upload New</label>
                                <input type="file" className="d-none" ref={primaryRef} onChange={handleFileChange} accept="image/png, image/svg+xml" />
                                <div className="upload-box upload-clickable d-flex flex-column align-items-center justify-content-center text-center" onClick={() => primaryRef.current.click()}>
                                    <i className="bi bi-upload fs-1 text-info mb-3"></i>
                                    <p className="mb-0 fw-bold">Click to upload or drag & drop</p>
                                    <p className="small text-secondary">PNG, SVG (MAX 5MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={status === 'saving' || (!primaryLogoFile && status !== 'error')}>
                        {status === 'saving' ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            )}
        </section>
    );
}

export default BrandingLogo;
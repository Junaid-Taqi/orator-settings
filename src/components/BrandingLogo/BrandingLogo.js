import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../Services/Constants/Constants';
import { useTranslation } from '../../Services/Localization/Localization';

const BrandingLogo = ({ user, detailsData, detailsLoading, fetchDetails, detailsError }) => {
    const t = useTranslation();
    // States for three different uploads
    const [primaryLogoPreview, setPrimaryLogoPreview] = useState(null);
    const [primaryLogoFile, setPrimaryLogoFile] = useState(null);
    const [coverImagePreview, setCoverImagePreview] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
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

    const [coverStatus, setCoverStatus] = useState('idle');
    const [coverMessage, setCoverMessage] = useState('');

    const primaryRef = useRef(null);
    const coverRef = useRef(null);
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
            if (detailsData.coverImageUrl) {
                setCoverImagePreview(detailsData.coverImageUrl);
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

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setCoverImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setCoverImagePreview(reader.result);
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

    const handleCoverSubmit = async (e) => {
        e.preventDefault();
        if (!groupId || !userId) return;

        setCoverStatus('saving');
        setCoverMessage('');

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

            if (coverImageFile) {
                payload.append('coverImage', coverImageFile);
            }

            const response = await axios.post(
                `${serverUrl}/o/settingsManagement/saveMunicipalityDetails`,
                payload,
                config
            );

            if (response.data?.success) {
                setCoverStatus('success');
                setCoverMessage('Cover image saved successfully!');
                setCoverImageFile(null); // Clear the file state after saving
                if (fetchDetails) fetchDetails();
            } else {
                setCoverStatus('error');
                setCoverMessage(response.data?.message || 'Failed to save cover image.');
            }
        } catch (err) {
            setCoverStatus('error');
            setCoverMessage('Network error saving cover image.');
            console.error(err);
        }
    };

    return (
        <section className="container-fluid p-5 branding-section min-vh-100 text-white">
            <h2 className="fw-bold mb-1">{t('branding')}</h2>
            <p className="text-info opacity-75 mb-4">{t('upload')}</p>

            {detailsLoading ? (
                <div className="text-center p-4">Loading details...</div>
            ) : detailsError ? (
                <div className="alert alert-danger mb-4">{detailsError}</div>
            ) : (
                <>
                    {/* --- PRIMARY LOGO SECTION --- */}
                    <form onSubmit={handleSubmit} className="mb-5">
                        {message && (
                            <div className={`alert ${status === 'error' ? 'alert-danger' : 'alert-success'} mb-4`}>
                                {message}
                            </div>
                        )}
                        <div className="main-card p-4 rounded-4 shadow-lg">
                            <h4 className="mb-1 fw-semibold">{t('municipalityLogo')}</h4>
                            <p className="small text-secondary mb-4">{t('municipalityLogoDescription')}</p>
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <label className="text-info small fw-bold mb-2 d-block">{t('currentLogo')}</label>
                                    <div className="upload-box d-flex align-items-center justify-content-center overflow-hidden">
                                        {primaryLogoPreview ? (
                                            <img src={primaryLogoPreview} className="img-fluid p-3 h-100" alt="Primary" />
                                        ) : (
                                            <div className="text-center">
                                                <i className="bi bi-building fs-1 text-info opacity-50 d-block"></i>
                                                <span className="text-info small">{t('noLogoUploaded')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="text-info small fw-bold mb-2 d-block">{t('uploadNewLogo')}</label>
                                    <input type="file" className="d-none" ref={primaryRef} onChange={handleFileChange} accept="image/png, image/svg+xml" />
                                    <div className="upload-box upload-clickable d-flex flex-column align-items-center justify-content-center text-center" onClick={() => primaryRef.current.click()}>
                                        <i className="bi bi-upload fs-1 text-info mb-3"></i>
                                        <p className="mb-0 fw-bold">{t('clickToUpload')}</p>
                                        <p className="small text-secondary">PNG, SVG (MAX 5MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-end">
                                <button type="submit" className="btn btn-success" disabled={status === 'saving' || (!primaryLogoFile && status !== 'error')}>
                                    {status === 'saving' ? 'Saving...' : t('saveChanges')}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* --- PORTAL COVER IMAGE SECTION --- */}
                    <form onSubmit={handleCoverSubmit}>
                        {coverMessage && (
                            <div className={`alert ${coverStatus === 'error' ? 'alert-danger' : 'alert-success'} mb-4`}>
                                {coverMessage}
                            </div>
                        )}
                        <div className="main-card p-4 rounded-4 shadow-lg">
                            <h4 className="mb-1 fw-semibold">{t('portalCoverImage')}</h4>
                            <p className="small text-secondary mb-4">{t('portalCoverImageDescription')}</p>
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <label className="text-info small fw-bold mb-2 d-block">{t('currentCoverImage')}</label>
                                    <div className="upload-box d-flex align-items-center justify-content-center overflow-hidden">
                                        {coverImagePreview ? (
                                            <img src={coverImagePreview} className="img-fluid p-3 h-100" alt="Cover" />
                                        ) : (
                                            <div className="text-center">
                                                <i className="bi bi-image fs-1 text-info opacity-50 d-block"></i>
                                                <span className="text-info small">{t('noCoverImageUploaded')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="text-info small fw-bold mb-2 d-block">{t('uploadNewCoverImage')}</label>
                                    <input type="file" className="d-none" ref={coverRef} onChange={handleCoverImageChange} accept="image/png, image/jpeg, image/jpg" />
                                    <div className="upload-box upload-clickable d-flex flex-column align-items-center justify-content-center text-center" onClick={() => coverRef.current.click()}>
                                        <i className="bi bi-upload fs-1 text-info mb-3"></i>
                                        <p className="mb-0 fw-bold">{t('clickToUpload')}</p>
                                        <p className="small text-secondary">PNG, JPG (MAX 5MB)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-end">
                                <button type="submit" className="btn btn-success" disabled={coverStatus === 'saving' || (!coverImageFile && coverStatus !== 'error')}>
                                    {coverStatus === 'saving' ? 'Saving...' : t('saveChanges')}
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </section>
    );
}

export default BrandingLogo;
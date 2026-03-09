import React, { useState, useRef } from 'react';

const BrandingLogo = () => {
    // States for three different uploads
    const [primaryLogo, setPrimaryLogo] = useState(null);
    const [secondaryLogo, setSecondaryLogo] = useState(null);
    const [favicon, setFavicon] = useState(null);

    const primaryRef = useRef(null);
    const secondaryRef = useRef(null);
    const faviconRef = useRef(null);

    const handleFileChange = (event, setter) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => setter(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="container-fluid p-5 branding-section min-vh-100 text-white">
            <h2 className="fw-bold mb-1">Branding & Logos</h2>
            <p className="text-info opacity-75 mb-4">Upload and manage logos used across templates</p>

            {/* --- PRIMARY LOGO SECTION --- */}
            <div className="main-card p-4 rounded-4 shadow-lg mb-5">
                <h4 className="mb-1 fw-semibold">Municipality Logo</h4>
                <p className="small text-secondary mb-4">Used as default cover image and in template headers</p>
                <div className="row g-4 mt-2">
                    <div className="col-md-6">
                        <label className="text-info small fw-bold mb-2 d-block">Current Logo</label>
                        <div className="upload-box d-flex align-items-center justify-content-center overflow-hidden">
                            {primaryLogo ? <img src={primaryLogo} className="img-fluid p-3 h-100" alt="Primary" /> : <div className="text-center"><i className="bi bi-building fs-1 text-info opacity-50 d-block"></i><span className="text-info small">No logo uploaded</span></div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="text-info small fw-bold mb-2 d-block">Upload New</label>
                        <input type="file" className="d-none" ref={primaryRef} onChange={(e) => handleFileChange(e, setPrimaryLogo)} />
                        <div className="upload-box upload-clickable d-flex flex-column align-items-center justify-content-center text-center" onClick={() => primaryRef.current.click()}>
                            <i className="bi bi-upload fs-1 text-info mb-3"></i>
                            <p className="mb-0 fw-bold">Click to upload or drag & drop</p>
                            <p className="small text-secondary">PNG, SVG (MAX 5MB)</p>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-success">
                Save Changes
            </button>

        </section>
    );
}

export default BrandingLogo;
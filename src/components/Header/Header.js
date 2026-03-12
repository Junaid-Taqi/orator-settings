import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../Services/Localization/Localization';
// using Bootstrap Icons for all icons (already installed)

const Header = ({ user }) => {
    const { t, lang, setLanguage } = useLanguage();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const handleLangChange = (e) => {
        setLanguage(e.target.value);
    };

    // Click outside to close menu logic
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        if (userMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

    const handleLogout = () => {
        setUserMenuOpen(false);
        window.location.href = '/c/portal/logout';
    };

    return (
        <nav className="displays-dashboard__nav main-bg">
            <div className="header-left">
                <h5 className="header-title text-primary m-0">
                    {user?.groups?.[0]?.name || t('municipality')}
                </h5>
                <p className="header-subtitle fs-12 m-0 text-white">{t('monitorNetwork')}</p>
            </div>


            <div className="displays-dashboard__nav-user-wrap d-flex gap-5" ref={userMenuRef}>
                {/* language selector */}
                <div className="header-lang">
                    {/* <label htmlFor="lang-select" className="me-1" style={{fontSize:'0.85rem'}}>{t('language')}:</label> */}
                    <select id="lang-select" value={lang} onChange={handleLangChange} className="form-select form-select-sm">
                        <option value="hr">Crotian</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <button
                    type="button"
                    className="displays-dashboard__nav-user"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                >
                    <i className="bi bi-person-circle nav-user-icon" />

                    <div className="nav-user-info">
                        <span className="nav-user-name">{user?.fullName}</span>
                        <span className="nav-user-email">{user?.email}</span>
                    </div>

                    {/* Toggle Arrow Logic */}
                    <div className="nav-user-chevron-box">
                        <i className={`bi ${userMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'} nav-user-chevron`} />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                    <div className="displays-dashboard__nav-user-menu" role="menu">
                        <button type="button" className="displays-dashboard__nav-user-menu-item" role="menuitem">
                            <i className="bi bi-person" style={{ marginRight: '10px' }} />
                            {t('profile')}
                        </button>
                        <button
                            type="button"
                            className="displays-dashboard__nav-user-menu-item displays-dashboard__nav-user-menu-item--logout"
                            role="menuitem"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right" style={{ marginRight: '10px' }} />
                            {t('logout')}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
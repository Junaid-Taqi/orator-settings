import React from 'react';
import { useTranslation } from '../../Services/Localization/Localization';

/**
 * Simple sidebar navigation used on the settings screen.
 * Uses Bootstrap classes for structure; colors are controlled
 * via the single shared CSS file (App.css).
 */
const DisplayNav = ({ active, onSelect }) => {
  const t = useTranslation();
  const items = [
    { key: 'general', icon: 'gear-fill', label: t('general') },
    { key: 'branding', icon: 'images', label: t('branding') },
  ];

  return (
    <nav className="sidebar d-flex flex-column p-3">
      <h5 className="text-light mb-4">{t('settings')}</h5>
      <ul className="nav nav-pills flex-column">
        {items.map(item => (
          <li className="nav-item" key={item.key}>
            <a
              href="#"
              className={`nav-link text-light ${active === item.key ? 'active' : ''}`}
              onClick={e => {
                e.preventDefault();
                onSelect(item.key);
              }}
            >
              <i className={`bi bi-${item.icon}`}></i>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DisplayNav;

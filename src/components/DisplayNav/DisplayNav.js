import React from 'react';

/**
 * Simple sidebar navigation used on the settings screen.
 * Uses Bootstrap classes for structure; colors are controlled
 * via the single shared CSS file (App.css).
 */
const DisplayNav = ({ active, onSelect }) => {
  const items = [
    { key: 'general', icon: 'gear-fill', label: 'General' },
    { key: 'branding', icon: 'images', label: 'Branding & Logos' },
    { key: 'template', icon: 'palette', label: 'Template Styles' },
    { key: 'categories', icon: 'list-ul', label: 'Category Defaults' },
    { key: 'display', icon: 'display-fill', label: 'Display Settings' },
    { key: 'notifications', icon: 'bell-fill', label: 'Notifications' },
    { key: 'users', icon: 'people-fill', label: 'User Management' },
    { key: 'security', icon: 'shield-lock-fill', label: 'Security' },
  ];

  return (
    <nav className="sidebar d-flex flex-column p-3">
      <h5 className="text-light mb-4">Settings</h5>
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

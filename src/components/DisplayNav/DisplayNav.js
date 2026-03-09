import React from 'react';

/**
 * Simple sidebar navigation used on the settings screen.
 * Uses Bootstrap classes for structure; colors are controlled
 * via the single shared CSS file (App.css).
 */
const DisplayNav = () => {
  return (
    <nav className="sidebar d-flex flex-column p-3">
      <h5 className="text-light mb-4">Settings</h5>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a href="#general" className="nav-link text-light">
            <i className="bi bi-gear-fill"></i>General
          </a>
        </li>
        <li className="nav-item">
          <a href="#branding" className="nav-link text-light">
            <i className="bi bi-images"></i>Branding &amp; Logos
          </a>
        </li>
        <li className="nav-item">
          <a href="#template" className="nav-link text-light">
            <i className="bi bi-palette"></i>Template Styles
          </a>
        </li>
        <li className="nav-item">
          <a href="#categories" className="nav-link text-light">
            <i className="bi bi-list-ul"></i>Category Defaults
          </a>
        </li>
        <li className="nav-item">
          <a href="#display" className="nav-link text-light">
            <i className="bi bi-display-fill"></i>Display Settings
          </a>
        </li>
        <li className="nav-item">
          <a href="#notifications" className="nav-link text-light">
            <i className="bi bi-bell-fill"></i>Notifications
          </a>
        </li>
        <li className="nav-item">
          <a href="#users" className="nav-link text-light">
            <i className="bi bi-people-fill"></i>User Management
          </a>
        </li>
        <li className="nav-item">
          <a href="#security" className="nav-link text-light">
            <i className="bi bi-shield-lock-fill"></i>Security
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DisplayNav;

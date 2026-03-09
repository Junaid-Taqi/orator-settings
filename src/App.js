import React, { useState } from 'react';
import './App.css';
import DisplayNav from './components/DisplayNav/DisplayNav';
import GeneralSettings from './components/GeneralSettings/GeneralSettings';
import BrandingLogo from './components/BrandingLogo/BrandingLogo';
import TemplateStyles from './components/TemplateStyles/TemplateStyles';
import DefaultCategory from './components/DefaultCategory/DefaultCategory';
import DisplaySettings from './components/DisplaySettings/DisplaySettings';
import Notifications from './components/Notifications/Notifications';
import UserManagement from './components/UserManagement/UserManagement';
import Security from './components/Security/Security';

/**
 * Top-level application component.
 * Uses Bootstrap grid to create a sidebar/main layout that wraps
 * responsively on small screens. Colors and spacing are defined
 * in a single CSS file (`App.css`).
 */
function App() {
  const [selectedSection, setSelectedSection] = useState('general');

  const renderSection = () => {
    switch (selectedSection) {
      case 'general':
        return (
          <GeneralSettings />
        );
      case 'branding':
        return (
          <BrandingLogo />  
        );
      case 'template':
        return (
          <TemplateStyles />
        )
      case 'categories':
        return (
          <DefaultCategory />
        )
      case 'display':
        return (
          <DisplaySettings />
        )
      case 'notifications':
        return (
          <Notifications />
        )
      case 'users':
        return (
          <UserManagement />
        )
      case 'security':
        return (
          <Security />
        )
      default:
        return null;
    }
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row gx-0">
        <div className="col-12 col-md-3">
          <DisplayNav active={selectedSection} onSelect={setSelectedSection} />
        </div>
        <main className="col-12 col-md-9 p-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;

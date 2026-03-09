import React, { useEffect, useState } from 'react';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Services/Store/Store';
import { fetchToken } from './Services/Slices/AuthSlice';
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
 * Top-level application component inner content.
 */
function AppContent() {
  const dispatch = useDispatch();
  const { token, expiresIn, status, error } = useSelector((state) => state.auth);
  const [selectedSection, setSelectedSection] = useState('general');

  const user = JSON.parse(sessionStorage.getItem("liferayUser")) || {
    "userId": "28497",
    "fullName": "Admin Opcina",
    "email": "admin@opcina.hr",
    "groups": [
      {
        "id": "27182",
        "name": "Municipility Three"
      }
    ]
  };

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (token && expiresIn) {
      // Refresh token 60 seconds before it expires
      const refreshTime = (expiresIn - 60) * 1000;

      if (refreshTime > 0) {
        const timer = setTimeout(() => {
          console.log("Token expiring soon, refreshing...");
          dispatch(fetchToken());
        }, refreshTime);

        return () => clearTimeout(timer);
      }
    }
  }, [token, expiresIn, dispatch]);

  const isBootstrappingAuth = !token && (status === 'idle' || status === 'loading');
  if (isBootstrappingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Loading...</div>
      </div>
    );
  }

  if (!token && status === 'failed') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#b91c1c' }}>
        <div>Failed to load token{error ? `: ${error}` : ''}</div>
      </div>
    );
  }

  const renderSection = () => {
    switch (selectedSection) {
      case 'general':
        return <GeneralSettings />;
      case 'branding':
        return <BrandingLogo />;
      case 'template':
        return <TemplateStyles />;
      case 'categories':
        return <DefaultCategory />;
      case 'display':
        return <DisplaySettings />;
      case 'notifications':
        return <Notifications />;
      case 'users':
        return <UserManagement />;
      case 'security':
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <div className="App container-fluid px-0">
      <div className="row gx-0">
        <div className="col-12 col-md-3">
          <DisplayNav active={selectedSection} onSelect={setSelectedSection} user={user} />
        </div>
        <main className="col-12 col-md-9 p-4">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppContent />
      </Provider>
    </div>
  );
}

export default App;

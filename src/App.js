import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import store from './Services/Store/Store';
import { fetchToken } from './Services/Slices/AuthSlice';
import { serverUrl } from './Services/Constants/Constants';
import DisplayNav from './components/DisplayNav/DisplayNav';
import GeneralSettings from './components/GeneralSettings/GeneralSettings';
import BrandingLogo from './components/BrandingLogo/BrandingLogo';
import { useTranslation } from './Services/Localization/Localization';
import Header from './components/Header/Header';

/**
 * Top-level application component inner content.
 */
function AppContent() {
  const dispatch = useDispatch();
  const { token, expiresIn, status, error } = useSelector((state) => state.auth);
  const [selectedSection, setSelectedSection] = useState('general');

  const [detailsData, setDetailsData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const t = useTranslation();

  const user = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("liferayUser")) || {
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
  }, []);

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (token && expiresIn) {
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

  const fetchDetails = useCallback(async () => {
    if (!token || !user?.groups?.[0]?.id) return;

    setDetailsLoading(true);
    setDetailsError('');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = { groupId: String(user.groups[0].id) };

      const response = await axios.post(
        `${serverUrl}/o/settingsManagement/getMunicipalityDetails`,
        payload,
        config
      );

      if (response.data?.success && response.data?.code === 200) {
        setDetailsData(response.data.data);
      } else {
        setDetailsError(response.data?.message || t('errorFailedToLoadDetails'));
      }
    } catch (err) {
      setDetailsError(t('errorNetworkErrorLoadingDetails'));
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }

  }, [token, user, t]);

  useEffect(() => {
    if (token && status === 'succeeded') {
      fetchDetails();
    }
  }, [token, status, fetchDetails]);

  const isBootstrappingAuth = !token && (status === 'idle' || status === 'loading');

  if (isBootstrappingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>
          {t('commonLoading')}
        </div>
      </div>
    );
  }

  if (!token && status === 'failed') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#b91c1c' }}>
        <div>
          {t('errorFailedToLoadToken')}{error ? `: ${error}` : ''}
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (selectedSection) {
      case 'general':
        return <GeneralSettings user={user} detailsData={detailsData} detailsLoading={detailsLoading} fetchDetails={fetchDetails} detailsError={detailsError} />;
      case 'branding':
        return <BrandingLogo user={user} detailsData={detailsData} detailsLoading={detailsLoading} fetchDetails={fetchDetails} detailsError={detailsError} />;
      default:
        return null;
    }
  };

  return (
    <div className="App container-fluid px-0">
      <Header user={user} />
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
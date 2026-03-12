import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../Services/Constants/Constants';
import { useTranslation } from '../../Services/Localization/Localization';

const GeneralSettings = ({ user, detailsData, detailsLoading, fetchDetails, detailsError }) => {
  const [formData, setFormData] = useState({
    siteName: '',
    webUrl: '',
    email: '',
    phoneNo: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error' | 'saving'
  const [message, setMessage] = useState('');
  const t = useTranslation();

  const groupId = user?.groups?.[0]?.id;
  const userId = user?.userId;

  useEffect(() => {
    if (detailsData) {
      setFormData({
        siteName: detailsData.siteName || '',
        webUrl: detailsData.webUrl || '',
        email: detailsData.email || '',
        phoneNo: detailsData.phoneNo || ''
      });
    }
  }, [detailsData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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
      payload.append('siteName', formData.siteName);
      payload.append('webUrl', formData.webUrl);
      payload.append('email', formData.email);
      payload.append('phoneNo', formData.phoneNo);

      const response = await axios.post(
        `${serverUrl}/o/settingsManagement/saveMunicipalityDetails`,
        payload,
        config
      );

      if (response.data?.success) {
        setStatus('success');
        setMessage(t('generalSettingsSuccessMessage'));
        if (fetchDetails) fetchDetails();
      } else {
        setStatus('error');
        setMessage(response.data?.message || t('generalSettingsErrorMessage'));
      }
    } catch (err) {
      setStatus('error');
      setMessage(t('generalSettingsNetworkErrorMessage'));
      console.error(err);
    }
  };

  return (
    <section id="general" className="card-wrapper">
      <h2 className="mb-4">{t('generalSettingsTitle')}</h2>

      {detailsLoading ? (
        <div className="text-center p-4">{t('generalSettingsLoadingDetails')}</div>
      ) : detailsError ? (
        <div className="alert alert-danger mb-4">{detailsError}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {message && (
            <div className={`alert ${status === 'error' ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="siteName" className="form-label">
              {t('generalSettingsMunicipalityName')}
            </label>
            <input
              type="text"
              className="form-control"
              id="siteName"
              placeholder={t('generalSettingsPlaceholdersMunicipalityName')}
              value={formData.siteName}
              onChange={handleChange}
              maxLength={255}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="webUrl" className="form-label">
              {t('generalSettingsOfficialWebsite')}
            </label>
            <input
              type="url"
              className="form-control"
              id="webUrl"
              placeholder={t('generalSettingsPlaceholdersWebsite')}
              value={formData.webUrl}
              onChange={handleChange}
              maxLength={255}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                {t('generalSettingsContactEmail')}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder={t('generalSettingsPlaceholdersEmail')}
                value={formData.email}
                onChange={handleChange}
                maxLength={255}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phoneNo" className="form-label">
                {t('generalSettingsContactPhone')}
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                placeholder={t('generalSettingsPlaceholdersPhone')}
                value={formData.phoneNo}
                onChange={handleChange}
                maxLength={255}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success" disabled={status === 'saving'}>
            {status === 'saving'
              ? t('generalSettingsSaving')
              : t('generalSettingsSaveChanges')}
          </button>
        </form>
      )}
    </section>
  );
}

export default GeneralSettings;
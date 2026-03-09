const GeneralSettings = () => {
  return (
    <section id="general" className="card-wrapper">
      <h2 className="mb-4">General Settings</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="municipality" className="form-label">
            Municipality Name
          </label>
          <input
            type="text"
            className="form-control"
            id="municipality"
            placeholder="Municipality of Tisno"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="greeting" className="form-label">
            Greeting Message
          </label>
          <textarea
            className="form-control"
            id="greeting"
            rows="3"
            maxLength={200}
            placeholder="Welcome to our Municipality"
          ></textarea>
          <div className="form-text text-end">0/200</div>
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Official Website URL
          </label>
          <input
            type="url"
            className="form-control"
            id="website"
            placeholder="https://municipality.gov"
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Contact Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="contact@municipality.gov"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Contact Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="timezone" className="form-label">
            Time Zone
          </label>
          <select className="form-select" id="timezone" defaultValue="UTC-5 (Eastern Time)">
            <option>UTC-12 (Dateline)</option>
            <option>UTC-11 (Niue)</option>
            <option>UTC-10 (Hawaii)</option>
            <option>UTC-9 (Alaska)</option>
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC-7 (Mountain Time)</option>
            <option>UTC-6 (Central Time)</option>
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC-4 (Atlantic Time)</option>
            <option>UTC-3 (Amazon)</option>
            <option>UTC-2 (Mid-Atlantic)</option>
            <option>UTC-1 (Azores)</option>
            <option>UTC+0 (UTC/GMT)</option>
            <option>UTC+1 (Central Europe)</option>
            <option>UTC+2 (Eastern Europe)</option>
            <option>UTC+3 (Moscow)</option>
            <option>UTC+4 (Gulf)</option>
            <option>UTC+5 (Pakistan)</option>
            <option>UTC+6 (Bangladesh)</option>
            <option>UTC+7 (Thailand)</option>
            <option>UTC+8 (China)</option>
            <option>UTC+9 (Japan)</option>
            <option>UTC+10 (Australia)</option>
            <option>UTC+11 (Solomon Is.)</option>
            <option>UTC+12 (New Zealand)</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default GeneralSettings;
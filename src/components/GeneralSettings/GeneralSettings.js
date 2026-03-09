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
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default GeneralSettings;
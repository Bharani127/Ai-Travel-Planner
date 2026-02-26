function StepDestination({ tripData, setTripData, next }){


  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="step-wrapper">

      <div className="icon-circle">
        📍
      </div>

      <h1>Where to?</h1>
      <p className="subtitle">Tell us your dream destination</p>

      <div className="input-group">
        <label>City / Destination</label>
        <input
          name="destination"
          placeholder="e.g., Paris, Tokyo, Barcelona..."
          value={tripData.destination}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Country</label>
        <input
          name="country"
          placeholder="e.g., France, Japan, Spain..."
          value={tripData.country}
          onChange={handleChange}
        />
      </div>

      <button className="continue-btn" onClick={next}>
        Continue →
        </button>


    </div>
  );
}

export default StepDestination;

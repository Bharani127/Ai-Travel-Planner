function StepDates({ tripData, setTripData, next, back }) {

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...tripData,
      [name]: value
    };

    // If start date changes, reset end date
    if (name === "startDate") {
      updatedData.endDate = "";
      updatedData.duration = 0;
    }

    // Calculate duration if both dates exist
    if (updatedData.startDate && updatedData.endDate) {
      const start = new Date(updatedData.startDate);
      const end = new Date(updatedData.endDate);

      const diffTime = end - start;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      // Inclusive day count
      updatedData.duration = diffDays >= 0 ? diffDays + 1 : 0;
    }

    setTripData(updatedData);
  };

  return (
    <div className="step-wrapper">

      <div className="icon-circle">
        📅
      </div>

      <h1>When?</h1>
      <p className="subtitle">Select your travel dates</p>

      <div className="date-row">

        {/* Start Date */}
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            min={today}
            value={tripData.startDate}
            onChange={handleChange}
          />
        </div>

        {/* End Date */}
        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            min={tripData.startDate || today}
            value={tripData.endDate}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* Duration Display */}
      {tripData.duration > 0 && (
        <div className="duration-box">
          Trip Duration: <strong>{tripData.duration} days</strong>
        </div>
      )}

      <button className="continue-btn" onClick={next}>
        Continue →
      </button>

      <button
        style={{
          marginTop: "15px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontWeight: "500"
        }}
        onClick={back}
      >
        ← Back
      </button>

    </div>
  );
}

export default StepDates;

function StepInterests({ tripData, setTripData, next, back }) {

  const interestOptions = [
    "Sightseeing",
    "Local Food",
    "Nightlife",
    "Art & Museums",
    "Nature",
    "Architecture",
    "Shopping",
    "Beaches",
    "History",
    "Adventure",
    "Photography",
    "Relaxation"
  ];

  const toggleInterest = (item) => {
    let updated;

    if (tripData.interests.includes(item)) {
      updated = tripData.interests.filter((i) => i !== item);
    } else {
      updated = [...tripData.interests, item];
    }

    setTripData({
      ...tripData,
      interests: updated
    });
  };

  return (
    <div className="step-wrapper">

      <div className="icon-circle">
        🎯
      </div>

      <h1>What interests you?</h1>
      <p className="subtitle">Select all that apply</p>

      <div className="interests-grid">
        {interestOptions.map((item) => (
          <div
            key={item}
            className={`interest-card ${
              tripData.interests.includes(item) ? "active-interest" : ""
            }`}
            onClick={() => toggleInterest(item)}
          >
            {item}
          </div>
        ))}
      </div>

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

export default StepInterests;

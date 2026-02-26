function StepReview({ tripData, next, back }) {

  const getCurrencySymbol = () => {
    if (tripData.currency === "INR") return "₹";
    if (tripData.currency === "USD") return "$";
    if (tripData.currency === "EUR") return "€";
  };

  return (
    <div className="step-wrapper">

      <div className="icon-circle">📋</div>

      <h1>Review Your Trip</h1>
      <p className="subtitle">Make sure everything looks good</p>

      <div className="review-card">
        <p><strong>Destination:</strong> {tripData.destination}, {tripData.country}</p>
        <p><strong>Dates:</strong> {tripData.startDate} → {tripData.endDate}</p>
        <p><strong>Duration:</strong> {tripData.duration} days</p>
        <p>
          <strong>Budget:</strong> {getCurrencySymbol()} {tripData.budget}
        </p>
        <p><strong>Travel Style:</strong> {tripData.style}</p>

        <div className="interest-tags">
          {tripData.interests.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      </div>

      <button className="continue-btn" onClick={next}>
        Generate Itinerary with AI ✨
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

export default StepReview;

function StepBudget({ tripData, setTripData, next, back }) {

  const handleBudgetChange = (e) => {
    setTripData({
      ...tripData,
      budget: e.target.value
    });
  };

  const handleCurrencyChange = (e) => {
    setTripData({
      ...tripData,
      currency: e.target.value
    });
  };

  const selectStyle = (styleType) => {
    setTripData({
      ...tripData,
      style: styleType
    });
  };

  const styles = [
    {
      name: "Budget",
      desc: "Affordable stays, public transport, local eateries."
    },
    {
      name: "Comfort",
      desc: "Mid-range hotels, guided tours, smooth travel."
    },
    {
      name: "Luxury",
      desc: "Premium hotels, private transport, fine dining."
    },
    {
      name: "Backpacking",
      desc: "Hostels, adventure routes, flexible exploration."
    }
  ];

  return (
    <div className="step-wrapper">

      <div className="icon-circle">
        💰
      </div>

      <h1>Budget & Style</h1>
      <p className="subtitle">Set your travel budget and style</p>

      {/* Currency + Budget */}
      <div className="budget-row">

        <select
          value={tripData.currency}
          onChange={handleCurrencyChange}
          className="currency-select"
        >
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>

        <input
          type="number"
          placeholder="Enter your budget"
          value={tripData.budget}
          onChange={handleBudgetChange}
        />

      </div>

      {/* Travel Style Cards */}
      <div className="style-grid">

        {styles.map((style) => (
          <div
            key={style.name}
            className={`style-card ${
              tripData.style === style.name ? "active-style" : ""
            }`}
            onClick={() => selectStyle(style.name)}
          >
            <h3>{style.name}</h3>
            <p className="style-desc">{style.desc}</p>
          </div>
        ))}

      </div>

      <button className="continue-btn" onClick={next}>
        Continue →
      </button>

      <button
        style={{ marginTop: "15px", background: "transparent", border: "none", cursor: "pointer" }}
        onClick={back}
      >
        ← Back
      </button>

    </div>
  );
}

export default StepBudget;

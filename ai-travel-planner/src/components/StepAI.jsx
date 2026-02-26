import { useState } from "react";
import { generateItinerary } from "../services/aiService";

function StepAI({ tripData }) {
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

const generatePlan = async () => {
  setLoading(true);
  setItinerary("");

  let fullItinerary = "";

  try {
    for (let day = 1; day <= tripData.duration; day++) {

      const prompt = `
You are a professional travel planner.

Create a detailed ${tripData.duration}-day travel itinerary for:

Destination: ${tripData.destination}, ${tripData.country}
Budget: ${tripData.currency} ${tripData.budget}
Travel Style: ${tripData.style}
Interests: ${tripData.interests.join(", ")}

Guidelines:
- Keep formatting clean and structured.
- Do not use markdown symbols like **, ###, or ---.
- Start directly from Day 1.
- Keep descriptions clear and concise (1–2 lines).
- If a place has already been used in another day, choose an alternative attraction instead.
- Provide realistic timings and approximate costs in ${tripData.currency}.

Provide Google Maps searchable location name clearly.
For each place also provide:
Latitude:
Longitude:

For EACH day provide:

Day X:

Morning:
Place Name:
Exact Location/Area:
Opening & Closing Timings:
Entry Fee:
Why this place is special (1–2 lines):
Best time to visit:

Afternoon:
Same structure as Morning.

Evening:
Same structure as Morning.

At the end of each day include:
Nearby Food Recommendation (budget friendly, include area):
Approximate Daily Spending Estimate (in ${tripData.currency}):
Local Transportation Suggestion:
1 Smart Travel Tip:

Generate itinerary for EXACTLY ONE DAY only.
Do NOT generate multiple days.
Do NOT restart from Day 1.
Return only content for Day ${day}.
`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Travel Planner"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1200,
          temperature: 0.7
        })
      });

      const data = await response.json();

     const text = data.choices[0].message.content;

      const singleDay = text.split("Day ").length > 2
        ? "Day " + text.split("Day ")[1]
        : text;

      fullItinerary += "\n\n" + singleDay;

      setItinerary(fullItinerary); // live update
    }

    setLoading(false);

  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};



  return (
    <div className="ai-container">
      <h1>Your AI Travel Plan</h1>

      <button onClick={generatePlan} className="generate-btn">
        {loading ? <div className="spinner"></div> : "Generate Itinerary"}
      </button>

      {itinerary && (
  <div className="days-wrapper">
    {itinerary.split("Day ").slice(1).map((dayBlock, index) => {
      const dayParts = dayBlock.split("Morning:");

      const dayTitle = "Day " + dayParts[0].trim();

      const morningPart = dayParts[1]?.split("Afternoon:")[0] || "";
      const afternoonPart =
        dayParts[1]?.split("Afternoon:")[1]?.split("Evening:")[0] || "";
      const eveningAndExtra =
        dayParts[1]?.split("Evening:")[1] || "";

      const extraSection = eveningAndExtra.split("Nearby Food Recommendation")[1] || "";
      const eveningPart = eveningAndExtra.split("Nearby Food Recommendation")[0] || "";
      const extractPlaceName = (text) => {
      const match = text.match(/Place Name:\s*(.*)/);
      return match ? match[1].trim() : "";
    };

      return (
        <div key={index} className="day-card">

          <h2 className="day-heading">{dayTitle}</h2>

          <div className="time-cards">
            <div className="time-card morning">
              <h3>Morning</h3>
              <p>{morningPart}</p>

              {extractPlaceName(morningPart) && (
                <iframe
                  width="100%"
                  height="200"
                  style={{ borderRadius: "12px", marginTop: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    extractPlaceName(morningPart)
                  )}&output=embed`}
                ></iframe>
              )}
            </div>

            <div className="time-card morning">
              <h3>Afternoon</h3>
              <p>{afternoonPart}</p>

              {extractPlaceName(afternoonPart) && (
                <iframe
                  width="100%"
                  height="200"
                  style={{ borderRadius: "12px", marginTop: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    extractPlaceName(afternoonPart)
                  )}&output=embed`}
                ></iframe>
              )}
            </div>

            <div className="time-card morning">
              <h3>Evening</h3>
              <p>{eveningPart}</p>

            {extractPlaceName(eveningPart) && (
              <iframe
                width="100%"
                height="200"
                style={{ borderRadius: "12px", marginTop: "10px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  extractPlaceName(eveningPart)
                )}&output=embed`}
              ></iframe>
            )}
          </div>
          </div>

          <div className="summary-card">
            <h3>Daily Summary</h3>
            <p>{extraSection}</p>
          </div>

        </div>
      );
    })}
  </div>
)}
    </div>
  );
}

export default StepAI;
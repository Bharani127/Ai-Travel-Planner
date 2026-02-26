export async function generateItinerary(prompt) {
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
      max_tokens: 5000,
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to generate itinerary");
  }

  return data.choices[0].message.content;
}
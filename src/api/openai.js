///src/api/openai.js
// ✅ Updated function to fetch AI summary from backend

export async function getAISummary(countryName) {
  const response = await fetch("http://localhost:5000/api/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countryName }),
  });

  const data = await response.json();
  return data.summary || "No summary found.";
}

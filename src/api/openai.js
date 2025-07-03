export async function getAISummary(countryName) {
  const response = await fetch("/api/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countryName }),
  });

  const data = await response.json();
  return data.summary || "No summary found.";
}

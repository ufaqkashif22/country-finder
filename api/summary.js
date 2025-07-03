// api/summary.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "Country name is required." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing Gemini API key in environment variables." });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide a short and friendly travel guide summary for ${country}.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiResponse.json();

    const summary =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no summary could be generated.";

    return res.status(200).json({ summary });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return res.status(500).json({ error: "Failed to fetch AI summary." });
  }
}

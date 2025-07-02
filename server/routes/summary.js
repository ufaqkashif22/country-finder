///D:\dummycountry\tailwind-dummy-ui\server\routes
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/summary", async (req, res) => {
  const { country } = req.body;
  console.log("🔍 Request for country:", country);

  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country)}`
    );

    const data = response.data;
    const summary = `🌍 ${data.title}: ${data.extract}`;
    res.json({ summary });

  } catch (err) {
    console.error("❌ Wikipedia fetch error:", err.message);
    res.status(500).json({ summary: "No summary found." });
  }
});

module.exports = router;

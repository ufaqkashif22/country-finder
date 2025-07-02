///D:\dummycountry\tailwind-dummy-ui\server\index.js

const express = require("express");
const cors = require("cors");
const summaryRoute = require("./routes/summary"); // ✅ Route import

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", summaryRoute); // ✅ API route

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

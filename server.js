require("dotenv").config();
const express = require("express");
const path = require("path");
const { searchUsOpenArticles } = require("./lib/googleSearch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/search", async (req, res) => {
  try {
    const result = await searchUsOpenArticles();
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
  });
}

module.exports = app;

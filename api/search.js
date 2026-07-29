const { searchUsOpenArticles } = require("../lib/googleSearch");

module.exports = async (req, res) => {
  try {
    const result = await searchUsOpenArticles();
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

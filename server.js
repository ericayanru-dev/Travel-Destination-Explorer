// server.js
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the built Vite files
app.use(express.static(path.resolve("./dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

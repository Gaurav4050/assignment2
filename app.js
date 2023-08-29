const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected");
  }
});

app.get("/search", (req, res) => {
  const query = req.query.query;
  const searchResults = [
    {
      title: "Movie 1",
      year: 2023,
      type: "Movie",
      poster:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      title: "Show 2",
      year: 2021,
      type: "Show",
      poster:
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  res.json(searchResults);
});

app.post("/favorite", (req, res) => {
  const { title, year, type, poster } = req.body;
  const query =
    "INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)";
  db.query(query, [title, year, type, poster], (err, result) => {
    if (err) {
      console.error("Error saving favorite:", err);
      res
        .status(500)
        .json({ error: "An error occurred while saving favorite." });
    } else {
      console.log("Favorite saved:", result);
      res.json({ message: "Favorite saved successfully." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

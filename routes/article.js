// Executes a query to the database
const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

// G) Get articles ordered by creation date descending
router.get("/desc", (req, res) => {
  const query = "SELECT * FROM articles ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// H) Get count of articles
router.get("/count", (req, res) => {
  const query = "SELECT COUNT(*) as 'Total Articles' FROM articles";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results[0]);
  });
});

// A) Add a new article
router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  const query =
    "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)";
  db.query(query, [title, content, author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Article added!", id: results.insertId });
  });
});

// B) Get all articles
router.get("/", (req, res) => {
  const query = "SELECT * FROM articles";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// C) Get article by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Article not found" });
      return;
    }
    res.json(results);
  });
});

// D) Delete article by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Article deleted!" });
  });
});

// E) Get articles by author
router.get("/author/:author", (req, res) => {
  const { author } = req.params;
  const query = "SELECT * FROM articles WHERE author = ?";
  db.query(query, [author], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Author not found" });
      return;
    }
    res.json(results);
  });
});

// F) Get articles created after a certain date
router.get("/after/:date", (req, res) => {
  const { date } = req.params;
  const query = "SELECT * FROM articles WHERE created_at > ?";
  db.query(query, [date], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: `Articles after ${date} not found` });
      return;
    }
    res.json(results);
  });
});

// I) Search articles by keyword in title
router.get("/search/:keyword", (req, res) => {
  const { keyword } = req.params;
  const query = "SELECT * FROM articles WHERE title LIKE ?";
  db.query(query, [`%${keyword}%`], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Keyword not found" });
      return;
    }
    res.json(results);
  });
});

// J) Get distinct authors
router.get("/authors/distinct", (req, res) => {
  const query = "SELECT DISTINCT author FROM articles";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

module.exports = router;

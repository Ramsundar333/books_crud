import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "test_copy",
});
//middleware express json
app.use(express.json());
//middleware CORS
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is Backend");
});

app.get("/books_copy", (req, res) => {
  const q = "SELECT * FROM books_copy";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books_copy", (req, res) => {
  const q = "INSERT INTO books_copy (`title`,`desc`,`price`,`cover`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been posted successfully!");
  });
});

app.delete("/books_copy/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books_copy WHERE ID =?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been Deleted successfully!");
  });
});

app.put("/books_copy/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books_copy SET `title=?`,`desc`=?,`price`=?,`cover`=? WHERE ID =? ";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully!");
  });
});

app.listen(8080, () => {
  console.log("Connected To Backend!");
});

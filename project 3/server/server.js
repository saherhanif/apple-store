const express = require("express");
var path = require("path");
const db = require("./dataBase/connection.js");
const PORT = 4500;
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { stringify } = require("querystring");

app.listen(PORT, () => {
  console.log(`listening http://localhost:${PORT}`);
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let idArray = await db.query(`select * from users where email=$1`, [email]);
  let userId = idArray.rows[0].id;
  const hash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  db.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, hash],
    function (error, result) {
      if (error) {
        return res.status(500).send();
      }
      if (result.rowCount == 0) {
        return res.status(401).json({ error: "incorrect email or password" });
      }
      // req.session.user = result.rows[0];
      res.json(result.rows[0]);
    }
  );
  // let userId = req.body.username;
  res.cookie("userId", userId, { maxAge: 6000000000000 });
});

app.post("/signup", (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.age ||
    !req.body.phone
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const hash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  const query = `INSERT INTO users (username, email, password,age ,phone) VALUES ($1, $2, $3,$4 ,$5)`;
  const values = [
    req.body.name,
    req.body.email,
    hash,
    req.body.age,
    req.body.phone,
  ];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Email already exist" });
    }
    res.json({ success: true });
  });
});

app.get("/products", async (req, res) => {
  let data = await db.query("SELECT * FROM products");
  res.json(data.rows);
});

app.post("/payment", async (req, res) => {
  const { user_id, products, total_price, order_date, payment_card_number } =
    req.body;

  let newUserId = await db.query(`SELECT id FROM users WHERE username = $1`, [
    user_id,
  ]);
  app.get("/payment", async (req, res) => {});
  // console.log(newUserId.rows[0].id);

  const query = `INSERT INTO orderhistory (user_id, product_ids, total_price,order_date ,payment_card_number) VALUES ($1, $2, $3,$4 ,$5)`;
  const values = [
    newUserId.rows[0].id,
    JSON.stringify(products),
    total_price,
    req.body.order_date,
    req.body.payment_card_number,
  ];
  db.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "something went wrong !" });
    }
    res.json({ success: true });
  });
});

app.get("/orders", async (req, res) => {
  let orderInfo = await db.query(
    `SELECT * FROM orderhistory WHERE user_id= $1 `,
    [req.cookies.userId]
  );
  res.json(orderInfo.rows);
});

// SELECT * FROM orderhistory user_id = $1 - GET /orders

// GET order/:id

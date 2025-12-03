const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// DB connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "Vishal@422",
});

// Home Route
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) AS count FROM user`;

    connection.query(q, (err, result) => {
        if (err) throw err;

        let count = result[0].count;
        res.render("home.ejs", { count });
    });
});

// Show all users
app.get("/user", (req, res) => {
    let q = "SELECT * FROM user LIMIT 100";

    connection.query(q, (err, users) => {
        if (err) throw err;

        res.render("users.ejs", { users });
    });
});

// Edit Form
app.get("/user/:id/edit", (req, res) => {
    const { id } = req.params;

    let q = `SELECT * FROM user WHERE user_id = ?`;

    connection.query(q, [id], (err, result) => {
        if (err) throw err;

        if (result.length === 0) return res.send("User not found!");

        let user = result[0];
        res.render("edit.ejs", { user });
    });
});

// Update Route
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { password: formPass, username: newUsername } = req.body;

    let q = `SELECT * FROM user WHERE user_id = ?`;

    connection.query(q, [id], (err, result) => {
        if (err) throw err;

        if (result.length === 0) return res.send("User not found!");

        let user = result[0];

        // Password check
        if (formPass !== user.password) {
            return res.send("❌ Wrong Password");
        }

        // Update username
        let q2 = `UPDATE user SET username = ? WHERE user_id = ?`;

        connection.query(q2, [newUsername, id], (err) => {
            if (err) throw err;

            res.redirect("/user");
        });
    });
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});

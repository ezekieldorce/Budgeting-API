const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/auth.js");

//GET

routes.get("/", function(req, res) {
  res.render("welcome.ejs");
});

routes.get("/contact", function(req, res) {
  res.render("contact.ejs");
});

routes.get("/login", function(req, res) {
  res.render("login.ejs");
});

routes.get("/transactions", function(req, res) {
  res.render("transaction.ejs");
});

routes.get("/transaction", function(req, res) {
  db.Transaction.findAll({
    // code here
    where: { userID: req.user.id }
  }).then(function(results) {
    // console.log(results);
    res.render("transaction.ejs", { transactions: results });
  });
});

routes.post("/transactions", function(req, res) {
  db.Transaction.create({
    // code here
    amount: req.body.amount
  });

  res.redirect("/transactions");
});

routes.post("/ninja", authenticate, function(req, res) {
  // console.log(req.body.taskItem);
  db.Tasks.create({
    todo: req.body.taskItem,
    userID: req.user.id
  }).then(function(results) {
    // console.log(results);
    res.redirect("/home");
  });
});

routes.delete("/delete/:index", authenticate, function(req, res) {
  console.log(req.params.index);
  db.Tasks.destroy({ where: { id: req.params.index } }).then(function(results) {
    console.log(results);
    res.redirect("/home");
  });
  res.json(db);
});

//GET Login
routes.get("/login", function(req, res) {
  res.render("login.ejs");
});

//POST Login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/transactions",
    failureRedirect: "/login"
  })
);

//GET logout

routes.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = routes;

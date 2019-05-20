const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const strategies = require('../config/passport-setup');
var mysql = require('mysql');
const con = require('../db');

//check if the user is logged in
const authCheck = (req,res,next) => {
  if(!req.user){
    res.redirect("/admin/");
  } else {
    next();
  }
};

//auth login
router.get("/", (req,res) => {
  res.render("admin", {user: req.user});
});

//auth log out
router.get("/logout", (req,res) => {
  //handle with passport
  req.logout();
  res.redirect("/");
});

//check user credentials
router.post('/check',
  strategies.authenticate('adminLoginCheck', {
    successRedirect: "/admin/profile",
    failureRedirect: '/admin/'
   })
);

router.get("/profile", authCheck, (req,res) => {
  res.render("adminProfile", {user: req.user});
});

router.get("/addBook", (req,res) => {
  res.render("addBook");
});

router.post("/addBk", authCheck, (req, res) => {
  con.query("select max(bid) as id from book", function(err, result){
    var id = result[0].id + 1;
    var str = "insert into book values(" + id + "," + mysql.escape(req.body.bname) + "," + mysql.escape(req.body.Author) + "," + mysql.escape(req.body.Genre) + "," + mysql.escape(req.body.Image) + "," + mysql.escape(req.body.Description) + "," + req.body.price + ")";
    con.query(str, (err, resul1, fields) => {
      res.redirect("/admin/addBook");
    });
  });
});

router.get("/addGame", authCheck, (req,res) => {
  res.render("addGame");
});

router.post("/addGm", authCheck, (req, res) => {
  con.query("select max(gid) as id from game", function(err, result){
    var id = result[0].id + 1;
    var str = "insert into game values(" + id + "," + mysql.escape(req.body.gname) + "," + mysql.escape(req.body.company) + "," + mysql.escape(req.body.category) + "," + mysql.escape(req.body.Image) + "," + mysql.escape(req.body.Description) + "," + req.body.price + ")";
    con.query(str, (err, resul1, fields) => {
      res.redirect("/admin/addGame");
    });
  });
});

//get the adminBook page
router.get("/books", authCheck, function(req,res){
  con.query("select * from book", function (err, result){
    renderResult(req,res,result);
  });
});
function renderResult(req,res,bks){
  const id = req.user.id;
  var sql = "SELECT bid FROM looksfor where uid=" + id;
  con.query(sql, function (err, result){
    res.render("adminBook",{books:bks},
    function(err,result){
      if(!err) {res.end(result);}
      else {res.end("Error!");
      console.log(err);
    }
    });
  });
}

//get the indexg page
router.get("/games", authCheck, function(req,res){
  con.query("select * from game", function (err, result){
    rendergmResult(req,res,result);
  });
});
function rendergmResult(req,res,gms){
  const id = req.user.id;
  var sql = "SELECT gid FROM checksout where uid=" + id;
  con.query(sql, function (err, result){
    res.render("adminGame",{games:gms},
    function(err,result){
      if(!err) {res.end(result);}
      else {res.end("Error!");
      console.log(err);
    }
    });
  });
}

router.post("/removeB/:id", function(req, res){
  const bid = req.params.id;
  var sql = "delete from book where bid=" + bid;
  con.query(sql, function (err, result){
    res.redirect("/admin/books");
  });
});

router.post("/removeG/:id", (req,res) => {
  const gid = req.params.id;
  var sql = "delete from game where gid=" + gid;
  con.query(sql, function (err, result){
    res.redirect("/admin/games");
  });
});

router.get("/orders", (req,res) => {
  var sql = "select name, Author, email, l.price from book b, looksfor l where b.bid=l.bid and email is not null";
  con.query(sql, (err, result) => {
    sql = "select gname, company, email, c.price from game g, checksout c where g.gid=c.gid and email is not null";
    con.query(sql, (err, result1) => {
      res.render("orders", {borders: result, gorders: result1, user: req.user});
    });
  });
});

module.exports = router;

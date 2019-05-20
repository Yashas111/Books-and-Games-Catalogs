const router = require('express').Router();
var mysql = require('mysql');
const con = require('../db');

//check if the user is logged in
const authCheck = (req,res,next) => {
  if(!req.user){
    res.redirect("/auth/login");
  } else {
    next();
  }
};

//get the discuss page
router.get("/", authCheck, (req,res) => {
  con.query("select * from discussion", function (err, result){
    res.render("profile", {user: req.user, discuss: result});
  });
});

//get the indexb page
router.get("/bookinfo", authCheck, function(req,res){
  con.query("select * from book", function (err, result){
    renderResult(req,res,result,"bookinfo");
  });
});
function renderResult(req,res,bks,str){
  const id = req.user.id;
  var sql = "SELECT bid FROM looksfor where uid=" + id;
  con.query(sql, function (err, result){
    res.render("indexb",{books:bks, str: str, currentUserTaggedBooks: result},
    function(err,result){
      if(!err) {res.end(result);}
      else {res.end("Error!");
      console.log(err);
    }
    });
  });
}

//get the scifi page
router.get("/scifi", authCheck, function(req,res){
  con.query("select * from book where Genre='Scifi'", function (err, result){
    renderResult(req,res,result,"scifi");
  });
});

//get the ufantasy page
router.get("/ufantasy", authCheck, function(req,res){
  con.query("select * from book where Genre='Urban Fantasy'", function (err, result){
    renderResult(req,res,result,"ufantasy");
  });
});

//get the fantasy page
router.get("/fantasy", authCheck, function(req,res){
  con.query("select * from book where Genre='Fantasy'", function (err, result){
    renderResult(req,res,result,"fantasy");
  });
});

//get the indexg page
router.get("/gameinfo", authCheck, function(req,res){
  con.query("select * from game", function (err, result){
    rendergmResult(req,res,result,"gameinfo");
  });
});
function rendergmResult(req,res,gms,str){
  const id = req.user.id;
  var sql = "SELECT gid FROM checksout where uid=" + id;
  con.query(sql, function (err, result){
    res.render("indexg",{games:gms, str: str, currentUserTaggedGames: result},
    function(err,result){
      if(!err) {res.end(result);}
      else {res.end("Error!");
      console.log(err);
    }
    });
  });
}

//get the stealth page
router.get("/stealth", authCheck, function(req,res){
  con.query("select * from game where category='Stealth'", function (err, result){
    rendergmResult(req,res,result,"stealth");
  });
});

//get the racing page
router.get("/racing", authCheck, function(req,res){
  con.query("select * from game where category='Racing'", function (err, result){
    rendergmResult(req,res,result,"racing");
  });
});

//get the adventure page
router.get("/adventure", authCheck, function(req,res){
  con.query("select * from game where category='Action'", function (err, result){
    rendergmResult(req,res,result,"adventure");
  });
});

//tag the books
router.get("/MarkedBooks/:id", (req,res) => {
  const uid = req.user.id;
  const bid = req.params.id;
  var sql = "insert into looksfor(uid, bid) values(" + uid + "," + bid + ")";
  con.query(sql, function (err, result){
    res.redirect("/profile/bookinfo");
  });
});

//tag the games
router.get("/MarkedGames/:id", (req,res) => {
  const uid = req.user.id;
  const gid = req.params.id;
  var sql = "insert into checksout(uid, gid) values(" + uid + "," + gid + ")";
  con.query(sql, function (err, result){
    res.redirect("/profile/gameinfo");
  });
});

//get the tagged page
router.get("/tagged", authCheck, (req,res) => {
  const id = req.user.id;
  var sql = "SELECT * FROM looksfor l, book b where l.bid=b.bid and uid=" + id;
  con.query(sql, function (err, resultmb){
    sql = "SELECT * FROM checksout c, game g where c.gid=g.gid and uid=" + id;
    con.query(sql, function (err, resultmg){
        res.render("tagged", {booksArray: resultmb, gamesArray: resultmg});
    });
  });
});

//untag the book
router.get("/RemoveBooks/:id", (req,res) => {
  const bid = req.params.id;
  var sql = "delete from looksfor where bid=" + bid;
  con.query(sql, function (err, result){
    res.redirect("/profile/tagged");
  });
});

//untag the game
router.get("/RemoveGames/:id", (req,res) => {
  const gid = req.params.id;
  var sql = "delete from checksout where gid=" + gid;
  con.query(sql, function (err, result){
    res.redirect("/profile/tagged");
  });
});

router.get("/orders", (req, res) => {
  var sql = "select l.bid, name, Author, email, l.price from book b, looksfor l where b.bid=l.bid and uid=" + req.user.id + " and email is not null";
  con.query(sql, (err, result) => {
    sql = "select c.gid, gname, company, email, c.price from game g, checksout c where g.gid=c.gid and uid=" + req.user.id + " and email is not null";
    con.query(sql, (err, result1) => {
      res.render("orders", {borders: result, gorders: result1, user: req.user});
    });
  });
});

//order the books
router.post("/orderb/:id", (req,res) => {
  const uid = req.user.id;
  const bid = req.params.id;
  con.query("select email from looksfor where bid=" + bid + " and uid=" + uid, (err, result1) => {
    var sql = "select price from book where bid=" + bid;
    con.query(sql, (err, result2) => {
      if(result1[0] !== undefined){
        sql = "update looksfor set email=" + mysql.escape(req.body.email) + ",price=" + result2[0].price + " where uid=" + uid + " and bid=" + bid;
        console.log(sql);
      } else {
        sql = "insert into looksfor values(" + uid + ", " + bid + "," + mysql.escape(req.body.email) + ", " + result2[0].price + ")"
      }
      con.query(sql, function (err, result3){
        res.redirect("/profile/orders");
      });
    });
  });
});

//order the games
router.post("/orderg/:id", (req,res) => {
  const uid = req.user.id;
  const gid = req.params.id;
  con.query("select email from checksout where gid=" + gid + " and uid=" + uid, (err, result1) => {
    var sql = "select price from game where gid=" + gid;
    con.query(sql, (err, result2) => {
      if(result1[0] !== undefined){
        sql = "update checksout set email=" + mysql.escape(req.body.email) + ",price=" + result2[0].price + " where uid=" + uid + " and gid=" + gid;
        console.log(sql);
      } else {
        sql = "insert into checksout values(" + uid + ", " + gid + "," + mysql.escape(req.body.email) + ", " + result2[0].price + ")"
      }
      con.query(sql, function (err, result3){
        res.redirect("/profile/orders");
      });
    });
  });
});

router.get("/cancelb/:id", (req, res) => {
  const bid = req.params.id;
  var sql = "delete from looksfor where bid=" + bid;
  con.query(sql, function (err, result){
    res.redirect("/profile/orders");
  });
});

router.get("/cancelg/:id", (req,res) => {
  const gid = req.params.id;
  var sql = "delete from checksout where gid=" + gid;
  con.query(sql, function (err, result){
    res.redirect("/profile/orders");
  });
});

module.exports = router;

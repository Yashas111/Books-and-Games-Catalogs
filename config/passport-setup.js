const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
const con = require('../db');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if(id == 391){
    con.query("select * from admin where id=" + id, function (err, rows){
      done(err, rows[0]);
    });
  } else {
    con.query("select * from user where id=" + id, function (err, rows){
      done(err, rows[0]);
    });
  }
});

//check user credentials from admin
passport.use("adminLoginCheck", new LocalStrategy(
  function(username, password, done) {
    const usr = username;
    const psw = password;
    var sql = "SELECT * FROM admin where Username=" + mysql.escape(usr) + " and Password=" + mysql.escape(psw);
      con.query(sql, function (err, result, fields) {
        if (err){
          return done(err);
        }
        if (!result.length){
          return done(null, false);
        }
        return done(null, result[0]);
      });
  }
));

//check user credentials
passport.use("loginCheck", new LocalStrategy(
  function(username, password, done) {
    const usr = username;
    const psw = password;
    var sql = "SELECT * FROM user where Username=" + mysql.escape(usr) + " and Password=" + mysql.escape(psw);
      con.query(sql, function (err, result, fields) {
        if (err){
          return done(err);
        }
        if (!result.length){
          return done(null, false);
        }
        return done(null, result[0]);
      });
  }
));

//save the user details
passport.use("save", new LocalStrategy(
  function(username, password, done) {
    con.query("select max(id) as id from user", function(err, result){
      var id = result[0].id + 1;
      console.log(id);
      const usr = username;
      const psw = password;
      var sql = "insert into user values(" + mysql.escape(usr) + "," + mysql.escape(psw) + "," + id + ")";
      console.log(sql);
      con.query(sql, function(err, result1, fields){
        sql = "SELECT * FROM user where Username=" + mysql.escape(usr) + " and Password=" + mysql.escape(psw);
        con.query(sql, function(err, result2, fields){
          console.log(result2[0]);
          done(null, result2[0]);
        });
      });
    });
  }
));

module.exports = passport;

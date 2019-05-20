const express = require('express');
const adminRoutes = require('./routes/admin-route');
const authRoutes = require('./routes/auth-route');
const passportSetup = require('./config/passport-setup');
var mysql = require('mysql');
const con = require('./db');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const profileRoutes = require('./routes/profile-route');
var socket = require('socket.io');

const app = express();

app.set("view engine", "ejs");

//create a session for the user
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//for css and js files
app.use("/assets",express.static("assets"));

//routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

//get home page
app.get("/", (req,res) => {
  res.render("home", {user: req.user});
});

//start server
var server = app.listen(3000, () => {
  console.log("listening for port 3000....");
});

//socket connection for server
var io = socket(server);

io.on("connection",function(socket){
  console.log("connection established",socket.id);

//Handle chat event
  socket.on("chat",function(data){
    const msg = data.message;
    const han = data.handle;
    var sql = "insert into discussion values(" + mysql.escape(msg) + "," + mysql.escape(han) + ")";
    con.query(sql, function (err, result){
      io.sockets.emit("chat",data);
    });
  });

  socket.on("typing",function(data){
    socket.broadcast.emit("typing",data)
  });

});

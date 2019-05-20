create database Catalog;
use Catalog;

create table user(
  Username varchar(30) collate latin1_general_cs
  Password varchar(30) collate latin1_general_cs,
  id int primary key,
);

create table admin(
  id int primary key,
  Username varchar(30) collate latin1_general_cs,
  Password varchar(30) collate latin1_general_cs
);

insert into admin values(391, "admin", "admin");

create table discussion(
  message varchar(1000),
  handle varchar(30)
);

create table Book(
  bid int primary key,
  name varchar(100),
  Author varchar(100),
  Genre varchar(50),
  image varchar(100),
  Description varchar(1500),
  price int
);

create table looksfor(
  uid int,
  bid int,
  email varchar(30),
  price int
  primary key(uid, bid),
  foreign key(uid) references user(id),
  foreign key(bid) references Book(bid)
);

create table Game(
  gid int primary key,
  gname varchar(100),
  company varchar(100),
  category varchar(50),
  image varchar(100),
  description varchar(1500),
  price int
);

create table checksout(
  uid int,
  gid int,
  email varchar(30),
  price int
  primary key(uid, gid),
  foreign key(uid) references user(id),
  foreign key(gid) references Game(gid)
);

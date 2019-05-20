This is a catalog website for books and games. You need to have node and mysql installed!

--Technologies used--
HTML, CSS, JavaScript, EJS, JQuery, Bootstrap, Nodejs, mysql

--How to run--
If this folder does't contain the node-modules folder then go to command prompt in this folder and give-> npm install
Run the db.sql file to create required tables.
If you want to see some pre-entered books then run the AddBook.sql and AddGame.sql files which contains 50 books and 30 games.
To run the server paste the following in the command prompt of this folder-> node app

--View the website--
To view the website open up any brower and go to-> localhost:3000/
You will view the homepage of the website. From there you have to login(if you have an account) or sign up(if you don't have one) to view the various books and games and to use the tag features.

--Add books and games--
Initially run the AddBook.sql and AddGame.sql files which contains 50 books and 30 games.
For admins to add more books or games, go to localhost:3000/admin/
Login with "admin" as both username and password.
There you have the add book and add game pages where you can enter the necessary information for your book or game. 
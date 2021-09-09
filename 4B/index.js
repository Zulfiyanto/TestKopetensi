//load mudules
const http = require("http");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const session = require("express-session");

// Load Databse
const mysqldb = require("./connection/db");

//create express server
const app = express();
const PORT = 5000;

//create a server for listen
const server = http.createServer(app);

// get data from html
app.use(express.json());
//get data from client side
app.use(express.urlencoded({ extended: false }));
//set app to use handlebarJS
app.set("view engine", "hbs");

//make public and uploads folder can read
app.use("/public", express.static(path.join(__dirname, "public")));

//register partial mode
hbs.registerPartials(__dirname + "/views/partials");

// Create Session
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: true,
    secret: "arishem",
  })
);

// Save to local Message
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

let isLogin = false;

//Get Data
app.get("/", (req, res) => {
  let sql = `SELECT C.*,U.email,U.username FROM collections_tb C JOIN users_tb U ON C.user_id = U.id;`;
  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      let collections = [];

      for (let i of result) {
        collections.push({
          id: i.id,
          idUser: i.user_id,
          username: i.username,
          name: i.name,
        });
      }
      res.render("index", {
        user: req.session.users,
        isLogin: req.session.isLogin,
        collections,
      });
    });
  });
});

//Collections
app.get("/collections/:id", (req, res) => {
  const id = req.params.id;
  let sql = `SELECT C.*,U.email,U.username FROM collections_tb C JOIN users_tb U ON C.user_id = U.id WHERE U.id = ${id};`;

  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      let collections = [];
      const data = {
        email: result[0].email,
      };

      for (let i of result) {
        collections.push({
          id: i.id,
          idUser: i.user_id,
          name: i.name,
          email: i.email,
        });
      }
      res.render("index", {
        user: req.session.users,
        isLogin: req.session.isLogin,
        collections,
        data,
      });
    });
  });
});

//Task Details
app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  let sql = `SELECT T.*,C.name AS name_collect FROM task_tb T JOIN collections_tb C ON T.collections_id = C.id WHERE C.id = ${id};`;

  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      let tasks = [];

      for (let i of result) {
        tasks.push({
          id: i.id,
          name: i.name,
          collect: i.name_collect,
          isDone: i.is_done,
        });
      }
      console.log(isLogin);
      res.render("detailCollections", {
        user: req.session.users,
        isLogin: req.session.isLogin,
        tasks,
      });
    });
  });
});

//Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//Delete task
app.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM task_tb WHERE id = ${id}`;

  mysqldb.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(sql, function (err, results) {
      if (err) throw err;
      res.redirect(`/tasks/${id}`);
    });
  });
});
//Delete Collection
app.get("/deleteS/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM collections_tb WHERE id = ${id}`;

  mysqldb.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(sql, function (err, results) {
      if (err) throw err;
      res.redirect(`/collections/${id}`);
    });
  });
});

//Handler Function
// Register
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  // validation input
  if (!email || !password || !username) {
    req.session.message = {
      type: "danger",
      message: "Be sure insert all field",
    };
    return res.redirect("/");
  }
  const sql = `INSERT INTO users_tb (email,username,password) VALUES ('${email}','${username}','${password}')`;
  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      req.session.message = {
        type: "success",
        message: "Register has successfully",
      };
      res.redirect("/");
    });
  });
});

// Login
app.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    req.session.message = {
      type: "danger",
      message: "Be sure insert all field",
    };
    return res.redirect("/");
  }
  const sql = `SELECT *, MD5(password) as password FROM users_tb WHERE (email='${user}' OR username='${user}') AND password='${password}'`;
  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      //   validation match
      if (result.length == 0) {
        req.session.message = {
          type: "danger",
          message: "Email and password dont match!",
        };
        return res.redirect("/");
      } else {
        req.session.message = {
          type: "success",
          message: "Login has successfully!",
        };

        req.session.isLogin = true;
        req.session.users = result[0].username;
        req.session.user = {
          id: result[0].id,
          email: result[0].email,
          user: result[0].username,
        };
      }
      res.redirect(`/collections/${req.session.user.id}`);
    });
  });
});

//Add Task
app.post("/addTask", (req, res) => {
  console.log(req.session.user.id);
  const { name } = req.body;

  if (!name) {
    req.session.message = {
      type: "danger",
      message: "Be sure insert all field",
    };
    return res.redirect("/");
  }

  let sql = `INSERT INTO task_tb (name,is_done,collections_id) VALUES ('${name}',0,'${id}')`;
  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      req.session.message = {
        type: "success",
        message: "Collections has successfully added",
      };
      res.redirect(`/tasks/${id}`);
    });
  });
});

//Add Collections
app.post("/addCollections", (req, res) => {
  const { name } = req.body;
  let id = req.session.user.id;
  if (!name) {
    req.session.message = {
      type: "danger",
      message: "Be sure insert all field",
    };
    return res.redirect("/");
  }

  let sql = `INSERT INTO collections_tb (name,user_id) VALUES ('${name}','${id}')`;
  mysqldb.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      if (err) throw err;
      req.session.message = {
        type: "success",
        message: "Collections has successfully added",
      };
      res.redirect(`/collections/${id}`);
    });
  });
});
server.listen(PORT, console.log("server listening on port " + PORT));

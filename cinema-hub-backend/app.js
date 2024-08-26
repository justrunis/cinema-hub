const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const adminRoutes = require("./routes/adminRoutes");

app.use((req, res, next) => {
  User.findById("66cc7aefd296c9e011e3bfe8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.zxzalz3.mongodb.net/cinema-hub?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "Justinas",
          email: "justrunis@gmail.com",
          password: "123456",
          role: "admin",
          watchlist: [],
          favorites: [],
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));

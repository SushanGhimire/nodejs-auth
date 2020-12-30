const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connecting to database.......");
    app.listen(8000, () => {
      console.log("listening to port 8000......");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

//routes for register
const register = require("./routes/auth");
const getUsers = require("./routes/getuser");
const postRoute = require("./routes/post");
app.use("/api/user", register);
app.use("/api/user", getUsers);
app.use("/api/posts", postRoute);

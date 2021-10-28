const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// import auth middleware
require("./middleware/auth");

// import router(s)
const authRoute = require("./routes/auth");
const musicRoute = require("./routes/music")

mongoose.connect("mongodb://127.0.0.1/ISDB_db");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// utilise router(s)
app.use("/api", authRoute);
app.use("/api", musicRoute);


app.get("/passwordISDB", passport.authenticate("jwt", {session: false}), function (req,res){
  res.json({
    message: "this is another area you are only allowed into if you have the right authorization!"});
})

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

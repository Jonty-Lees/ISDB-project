const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// import auth middleware
require("./middleware/auth");

// import router(s)
const authRoute = require("./routes/auth");
const musicRoute = require("./routes/music")


mongoose.connect("mongodb://127.0.0.1/ISDB_auth");
// mongoose.connect("mongodb://127.0.0.1/ISDB_db");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// utilise router(s)
app.use("/api", authRoute);
app.use("/api", musicRoute);


app.get("/secret", passport.authenticate("jwt", { session: false }), function (req, res) {
  res.json({
    message: "You have access to a secret zone"
  });
});

app.get("/tracks/:id", passport.authenticate
  ("jwt", { session: false }),
  async function (req, res) {
    const track = await Track.findOne({ _id: req.params.id });
    return res.json(track);
  })

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

// import auth middleware
require("./middleware/auth");

// import router(s)
const authRoute = require("./routes/auth");







// // NEW 
// const swaggerUi = require("swagger-ui-express");
// // new
// const swaggerDocument = require("./routes/swagger.json");

mongoose.connect("mongodb://127.0.0.1/ISDB_auth");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// utilise router(s)
app.use("/api", authRoute);

// //NEW 
// app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/secret", passport.authenticate("jwt", { session: false }), function (req,res) {
  res.json({
    message: "You have access to a secret zone"
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

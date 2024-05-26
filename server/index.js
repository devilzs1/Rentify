const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongosanitize = require("express-mongo-sanitize");
const helmet = require("helmet"); 
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const routes = require("./routes/index");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    secret: "rentify",
    proxy: true,
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongosanitize());
app.use(routes);

  
// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} ...`);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down ...");
  app.close(() => {
    process.exit(1);
  });
});

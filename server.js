// to access .env variables when developing locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const mongoose = require("mongoose");

// create express application
const app = express();

// pulling in the routes
const signUpRouter = require("./routes/user");
const parrotRouter = require("./routes/parrot");
const signInRouter = require("./routes/sessions");
const uploadRouter = require("./routes/upload");
const homeRouter = require("./routes/home");

const PORT = process.env.PORT;

// allow for cross origin requests
app.use(cors());

// middleware allows express server to parse the different request types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected"));

// session store connectiong to the Mongo DB database
const store = new MongoStore({
  mongoUrl: process.env.DATABASE_URL,
  collection: "sessions",
});

//catching errors for saving session to DB
store.on("error", function (error) {
  console.log(error);
});

// creating a session, defining cookie expiration limit, assigning to the mongo store
app.use(
  require("express-session")({
    secret: "a big secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week (calculated in milliseconds )
    },
    store: store,
  })
);

// // Authenticating session??
// app.use((req, res, next) => {
//   res.locals.isAuth = req.session.isAuth;
//   next();
// });

app.use("", homeRouter);
app.use("/api/users", signUpRouter);
app.use("/api/parrots", parrotRouter);
app.use("/api/sessions", signInRouter);
app.use("/api/uploads", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});

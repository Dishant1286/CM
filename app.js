const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const { check, validationResult } = require("express-validator");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const index = require("./routes/index");

// View Engine
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware (Using Express built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { httpOnly: true, maxAge: 2419200000 }, // Session cookie expires in 28 days
  })
);

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Express messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Route to handle form submission with validation
app.post(
  "/submit",
  [
    check("username")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    check("email").isEmail().withMessage("Invalid email address"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with processing if no validation errors
    res.send("Data is valid");
  }
);

// Use Routes
app.use("/", index);

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});

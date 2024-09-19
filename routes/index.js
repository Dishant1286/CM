// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// let User = require('../models/user');
// let Complaint = require('../models/complaint');
// let ComplaintMapping = require('../models/complaint-mapping');

// // Home Page - Dashboard
// router.get('/', ensureAuthenticated, (req, res, next) => {
//     res.render('index');
// });

// // Login Form
// router.get('/login', (req, res, next) => {
//     res.render('login');
// });

// // Register Form
// router.get('/register', (req, res, next) => {
//     res.render('register');
// });

// // Logout
// router.get('/logout', ensureAuthenticated,(req, res, next) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/login');
// });

// // Admin
// router.get('/admin', ensureAuthenticated, (req,res,next) => {
//     Complaint.getAllComplaints((err, complaints) => {
//         if (err) throw err;

//         User.getEngineer((err, engineer) => {
//             if (err) throw err;

//             res.render('admin/admin', {
//                 complaints : complaints,
//                 engineer : engineer,
//             });
//         });
//     });
// });

// // Assign the Complaint to Engineer
// router.post('/assign', (req,res,next) => {
//     const complaintID = req.body.complaintID;
//     const engineerName = req.body.engineerName;

//     req.checkBody('complaintID', 'Contact field is required').notEmpty();
//     req.checkBody('engineerName', 'Description field is required').notEmpty();

//     let errors = req.validationErrors();

//     if (errors) {
//         res.render('admin/admin', {
//             errors: errors
//         });
//     } else {
//         const newComplaintMapping = new ComplaintMapping({
//             complaintID: complaintID,
//             engineerName: engineerName,
//         });

//         ComplaintMapping.registerMapping(newComplaintMapping, (err, complaint) => {
//             if (err) throw err;
//             req.flash('success_msg', 'You have successfully assigned a complaint to Engineer');
//             res.redirect('/admin');
//         });
//     }

// });

// // Junior Eng
// router.get('/jeng', ensureAuthenticated, (req,res,next) => {
//     res.render('junior/junior');
// });

// //Complaint
// router.get('/complaint', ensureAuthenticated, (req, res, next) => {
//     //console.log(req.session.passport.username);
//     //console.log(user.name);
//     res.render('complaint', {
//         username: req.session.user,
//     });
// });

// //Register a Complaint
// router.post('/registerComplaint', (req, res, next) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const contact = req.body.contact;
//     const desc = req.body.desc;

//     const postBody = req.body;
//     console.log(postBody);

//     req.checkBody('contact', 'Contact field is required').notEmpty();
//     req.checkBody('desc', 'Description field is required').notEmpty();

//     let errors = req.validationErrors();

//     if (errors) {
//         res.render('complaint', {
//             errors: errors
//         });
//     } else {
//         const newComplaint = new Complaint({
//             name: name,
//             email: email,
//             contact: contact,
//             desc: desc,
//         });

//         Complaint.registerComplaint(newComplaint, (err, complaint) => {
//             if (err) throw err;
//             req.flash('success_msg', 'You have successfully launched a complaint');
//             res.redirect('/');
//         });
//     }
// });

// // Process Register
// router.post('/register', (req, res, next) => {
//     const name = req.body.name;
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const password2 = req.body.password2;
//     const role = req.body.role;

//     req.checkBody('name', 'Name field is required').notEmpty();
//     req.checkBody('email', 'Email field is required').notEmpty();
//     req.checkBody('email', 'Email must be a valid email address').isEmail();
//     req.checkBody('username', 'Username field is required').notEmpty();
//     req.checkBody('password', 'Password field is required').notEmpty();
//     req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
//     req.checkBody('role', 'Role option is required').notEmpty();

//     let errors = req.validationErrors();

//     if (errors) {
//         res.render('register', {
//             errors: errors
//         });
//     } else {
//         const newUser = new User({
//             name: name,
//             username: username,
//             email: email,
//             password: password,
//             role: role
//         });

//         User.registerUser(newUser, (err, user) => {
//             if (err) throw err;
//             req.flash('success_msg', 'You are Successfully Registered and can Log in');
//             res.redirect('/login');
//         });
//     }
// });

// // Local Strategy
// passport.use(new LocalStrategy((username, password, done) => {
//     User.getUserByUsername(username, (err, user) => {
//         if (err) throw err;
//         if (!user) {
//             return done(null, false, {
//                 message: 'No user found'
//             });
//         }

//         User.comparePassword(password, user.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//                 return done(null, user);
//             } else {
//                 return done(null, false, {
//                     message: 'Wrong Password'
//                 });
//             }
//         });
//     });
// }));

// passport.serializeUser((user, done) => {
//     var sessionUser = {
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//     }
//     done(null, sessionUser);
// });

// passport.deserializeUser((id, done) => {
//     User.getUserById(id, (err, sessionUser) => {
//         done(err, sessionUser);
//     });
// });

// // Login Processing
// router.post('/login', passport.authenticate('local',
//     {
//         failureRedirect: '/login',
//         failureFlash: true

//     }), (req, res, next) => {

//         req.session.save((err) => {
//         if (err) {
//             return next(err);
//         }
//         if(req.user.role==='admin'){
//             res.redirect('/admin');
//         }
//         else if(req.user.role==='jeng'){
//             res.redirect('/jeng');
//         }
//         else{
//             res.redirect('/');
//         }
//     });
// });

// // Access Control
// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         req.flash('error_msg', 'You are not Authorized to view this page');
//         res.redirect('/login');
//     }
// }

// module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { check, validationResult } = require("express-validator");

let User = require("../models/user");
let Complaint = require("../models/complaint");
let ComplaintMapping = require("../models/complaint-mapping");

// Home Page - Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index");
});

// Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

// Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });
});

// Admin
router.get("/admin", ensureAuthenticated, async (req, res) => {
  try {
    const complaints = await Complaint.getAllComplaints();
    const engineers = await User.getEngineer(); // Assuming this method is similar
    res.render("admin/admin", {
      complaints: complaints,
      engineer: engineers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Assign the Complaint to Engineer
router.post(
  "/assign",
  [
    check("complaintID", "Complaint ID field is required").notEmpty(),
    check("engineerName", "Engineer Name field is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("admin/admin", {
        errors: errors.array(),
      });
    }

    const { complaintID, engineerName } = req.body;

    const newComplaintMapping = new ComplaintMapping({
      complaintID: complaintID,
      engineerName: engineerName,
    });

    try {
      await ComplaintMapping.registerMapping(newComplaintMapping);
      req.flash(
        "success_msg",
        "You have successfully assigned a complaint to Engineer"
      );
      res.redirect("/admin");
    } catch (err) {
      console.error(err);
      req.flash("error_msg", "There was an error assigning the complaint.");
      res.redirect("/admin");
    }
  }
);

// Junior Eng
router.get("/jeng", ensureAuthenticated, (req, res) => {
  res.render("junior/junior");
});

// Complaint
router.get("/complaint", ensureAuthenticated, (req, res) => {
  res.render("complaint", {
    username: req.user.username, // Changed to use req.user.username
  });
});

// Register a Complaint
router.post(
  "/registerComplaint",
  [
    check("contact").notEmpty().withMessage("Contact field is required"),
    check("desc").notEmpty().withMessage("Description field is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("complaint", {
        errors: errors.array(),
      });
    }

    const { name, email, contact, desc } = req.body;

    const newComplaint = new Complaint({
      name: name,
      email: email,
      contact: contact,
      desc: desc,
    });

    try {
      await Complaint.registerComplaint(newComplaint);
      req.flash("success_msg", "You have successfully launched a complaint");
      res.redirect("/");
    } catch (err) {
      console.error(err);
      req.flash("error_msg", "There was an error launching the complaint.");
      res.redirect("/complaint");
    }
  }
);

// Process Register
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name field is required"),
    check("email").notEmpty().withMessage("Email field is required"),
    check("email").isEmail().withMessage("Email must be a valid email address"),
    check("username").notEmpty().withMessage("Username field is required"),
    check("password").notEmpty().withMessage("Password field is required"),
    check("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    check("role").notEmpty().withMessage("Role option is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.array(),
      });
    }

    const { name, username, email, password, role } = req.body;

    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
      role: role,
    });

    try {
      await User.registerUser(newUser);
      req.flash(
        "success_msg",
        "You are Successfully Registered and can Log in"
      );
      res.redirect("/login");
    } catch (err) {
      console.error(err);
      req.flash("error_msg", "There was an error registering the user.");
      res.redirect("/register");
    }
  }
);

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "No user found" });
      }

      const isMatch = await User.comparePassword(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  const sessionUser = {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  done(null, sessionUser);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Login Processing
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      if (req.user.role === "admin") {
        res.redirect("/admin");
      } else if (req.user.role === "jeng") {
        res.redirect("/jeng");
      } else {
        res.redirect("/");
      }
    });
  }
);

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "You are not Authorized to view this page");
    res.redirect("/login");
  }
}

module.exports = router;

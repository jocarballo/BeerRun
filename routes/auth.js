const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
// GET route ==> to display the signup form to users

// POST route ==> to process form data

// the get route skipped

// POST route ==> to process form data
router.post("/profile", (req, res, next) => {
  // console.log("The form data: ", req.body);

  const { username, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // username: username
        username,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDB) => {
      req.session.currentUser = userFromDB;
      console.log("Newly created user is: ", userFromDB);
      res.redirect("/profile");
    })
    .catch((error) => next(error));
});





router.post("/login", (req, res, next) => {
  console.log("SESSION =====> ", req.session);
  const { username, password } = req.body;
  User.findOne({ username }).then((userFromDB) => {
    if (!userFromDB) {
      console.log("failed login");
      res.render("index");
      return;
    } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
      req.session.currentUser = userFromDB;
      res.redirect("/profile");
    }
  });
});













router.post('/home', (req,res,next) => {
req.session.destroy(err => {
  if (err) next(err);
  res.redirect('/home')
})
})
module.exports = router;

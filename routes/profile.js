const User = require("../models/User.model");

const router = require("express").Router();

/* GET profile */
router.get("/profile", (req, res, next) => {
    // res.render("profile");
    User.findById(req.session.currentUser._id)
    .populate('beerRuns')

    .then(user => {

      console.log("this is the user " + user)
      res.render('profile', {user})
    })
    .catch(error => {console.log(error)})
});



module.exports = router;

const router = require("express").Router();

/* GET profile */
router.get("/profile", (req, res, next) => {
  // const user = req.session.
  console.log("session info " + req.session.currentUser[0]);
    // res.render("profile");
    // console.log(req.body)
});



module.exports = router;

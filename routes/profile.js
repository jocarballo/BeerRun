const router = require("express").Router();

/* GET profile */
router.get("/profile", (req, res, next) => {
    res.render("profile");
});



module.exports = router;

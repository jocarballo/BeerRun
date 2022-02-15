const router = require("express").Router();

/* GET profile */
router.get("/profile", (req, res, next) => {
    res.render("profile");
    console.log(req.body)
});



module.exports = router;

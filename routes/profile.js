const router = require("express").Router();
const { redirect } = require("express/lib/response");
const BeerRun = require("../models/BeerRun.model");

/* GET profile */
router.get("/profile", (req, res, next) => {
    let user = req.session.currentUser;

    if(user == undefined) {
        res.redirect("/home");
        return
    }

    BeerRun.find()
        .then(beerRuns => {
            let userBeerRuns = beerRuns.filter(beerRun => beerRun.creator == user._id);
            res.render("profile", {
                beerRuns: beerRuns,
                userBeerRuns: userBeerRuns,
                user
            });
        })
        .catch(err => next(err));
});


module.exports = router;

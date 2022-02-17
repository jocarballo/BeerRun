const router = require("express").Router();
const BeerRun = require("../models/BeerRun.model"); 

/* GET profile */
router.get("/profile", (req, res, next) => {
    BeerRun.find()
        .then(beerRuns => {
            res.render("profile", {
                beerRuns: beerRuns
            });
        })
        .catch(err => next(err));
});


module.exports = router;

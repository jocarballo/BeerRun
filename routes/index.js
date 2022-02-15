const router = require("express").Router();
const BeerRun = require('../models/BeerRun.model');


/* GET home page */

router.get("/home", (req, res, next) => {
  BeerRun.find()
  .then(beerRuns => {
    res.render('index', { beerRuns: beerRuns })
  })
  // catch err
});




module.exports = router;

const router = require("express").Router();
const BeerRun = require('../models/BeerRun.model');


router.get('/trip/create', (req, res, next) => {
    res.render('trip-create')
});

router.post('/trip/create', (req, res, next) => {
    console.log(req.body)
    const { name, startLongitudePoint, endLongitudePoint, startLatitudePoint, endLatitudePoint, numberOfStops } = req.body
    BeerRun.create({ name, startLongitudePoint, endLongitudePoint, startLatitudePoint, endLatitudePoint, numberOfStops })
    .then(beerRun => {
        console.log("Created", beerRun);
        res.redirect('/profile');
    })
    .catch(err => {
        res.render('/trip/create');
    })
});





module.exports = router;

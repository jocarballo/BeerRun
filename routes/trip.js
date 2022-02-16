const router = require("express").Router();
const BeerRun = require('../models/BeerRun.model');
const { getBars } = require("../scripts/script");

router.get('/trip/create', (req, res, next) => {
    res.render('trip-create')
});


router.post('/trip/create', (req, res, next) => {
    const { name, startLongitudePoint, endLongitudePoint, startLatitudePoint, endLatitudePoint } = req.body

    // getting bars between start and end location
    getBars(
        startLocation = {
            latitude: startLatitudePoint,
            longitude: startLongitudePoint
        },
        endLocation = {
            latitude: endLatitudePoint,
            longitude: endLongitudePoint
        }
    ).then(bars => {
        let startLocation = [startLongitudePoint, startLatitudePoint];
        let endLocation = [endLongitudePoint, endLatitudePoint];

        BeerRun.create({ name, bars, startLocation, endLocation })
    })
    .then(res.redirect('/'))
    .catch(err => next(err));
});

router.get('/trip/:id', (req, res, next) => {
    const id = req.params.id
    BeerRun.findById(id)
        .then(beerRun => {
            let markersJson = {
                type: 'FeatureCollection',
                features: beerRun.bars
             }

             let markersJsonStr = JSON.stringify(markersJson);
            
             console.log(markersJsonStr);
             res.render('trip-details', 
                { 
                    beerRun: beerRun,
                    markersJsonStr: encodeURIComponent(markersJsonStr)
                 },
            )
         })
        .catch(err => next(err));
});




module.exports = router;

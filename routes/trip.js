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
        console.log("filtered bars", bars);
        let startLocation = [startLongitudePoint, startLatitudePoint];
        let endLocation = [endLongitudePoint, endLatitudePoint];

        BeerRun.create({ name, bars, startLocation, endLocation })
    })
    .then(res.redirect('/home'))
    .catch(err => next(err));
});

router.get('/trip/:id', (req, res, next) => {
    const id = req.params.id
    BeerRun.findById(id)
        .then(beerRun => {
            let bars = beerRun.bars;

            // extract information to center map
            let barAtCenter = bars[Math.round((bars.length - 1) / 2)];
            let centerCoordinates = barAtCenter.get("geometry").coordinates;
            console.log("coordinates", centerCoordinates);

            // create json to display markers
            let markersJson = {
                type: 'FeatureCollection',
                features: beerRun.bars
             }

             let markersJsonStr = JSON.stringify(markersJson);
            
             console.log(markersJsonStr);
             res.render('trip-details', 
                { 
                    beerRun: beerRun,
                    markersJsonStr: encodeURIComponent(markersJsonStr),
                    centerCoordinates: centerCoordinates
                 },
            )
         })
        .catch(err => next(err));
});




module.exports = router;

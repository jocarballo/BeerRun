const router = require("express").Router();
const BeerRun = require('../models/BeerRun.model');
const axios = require('axios')
const { getBars } = require("../scripts/script");
const ACCESS_TOKEN = "pk.eyJ1Ijoiam9jYXJiYWxsbyIsImEiOiJja3puMzVsaWM0YTl2MzBvMWVqcHJxaWhiIn0.UJWUB-BwaxMmZH4w7eSgGQ";


/*router.post('/findaddress', (req,res,next) => {
  const {addressvalue} = req.body
  // function address(addressvalue) {
  //   let location = document.getElementById("addressvalue").value
    console.log(addressvalue)
    axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressvalue}.json?access_token=${ACCESS_TOKEN}`)
    .then(json => {
      //here is the coordinates of the address
      console.log(json.data.features[0].geometry.coordinates);
    })
    .catch(error => {
      console.error(error)
    })
  }
)*/

router.post('/trip/create', (req, res, next) => {
    const { name, startLongitudePoint, endLongitudePoint, startLatitudePoint, endLatitudePoint } = req.body
    console.log(req.body)

    if(req.session.currentUser == undefined) {
        res.redirect("/home");
        return
    }
    
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
        let creator = req.session.currentUser._id;

        return BeerRun.create({ name, bars, startLocation, endLocation, creator })
    })
    .then(beerRun => {
        res.redirect(`/trip/${beerRun._id}`)
    })

    .catch(err => next(err));
});

router.get('/trip/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    BeerRun.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "user"
            }
        })
        .then(beerRun => {
            console.log(beerRun);
            let bars = beerRun.bars;

            // extract information to center map
            let barAtCenter = bars[Math.round((bars.length - 1) / 2)];
            let centerCoordinates = barAtCenter.get("geometry").coordinates;
            
             let barsArray = beerRun.bars;

             res.render('trip-details',
                {
                    beerRun: beerRun,
                    // we transform objects into strings, so HBS can put them inside the javascript
                    barsArray: JSON.stringify(barsArray),
                    centerCoordinates: JSON.stringify(centerCoordinates)
                 },
            )
         })
        .catch(err => next(err));
});




module.exports = router;

const router = require("express").Router();
const BeerRun = require("../models/BeerRun.model");
const Review = require('../models/Review.model');

router.post('/trip/:id/review', (req, res, next) => {
    const beerRunId = req.params.id;
    const { review } = req.body;
    const user = req.session.currentUser;

    if(user == undefined) {
        res.redirect("/home")
        return
    }

    Review.create({ comment: review, user: user._id })
        .then(review => {
            return BeerRun.findByIdAndUpdate(beerRunId, { $push: { reviews: review._id}}, {new: true})
        })
        .then(review => { res.redirect(`/trip/${beerRunId}`)})
        .catch(err => console.error(err));
});







module.exports = router;

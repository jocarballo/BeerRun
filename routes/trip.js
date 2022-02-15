const router = require("express").Router();


router.get('/trip/create', (req, res, next) => {
    res.render('trip-create')
});

router.post('/trip/create', (req, res, next) => {
    console.log(req.body)
    
});





module.exports = router;

const router = require('express').Router();

//routes
router.get('/',(req, res) => {
    res.send('welcome to  HomePage');
})

module.exports = router;
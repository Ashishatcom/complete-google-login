var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/login', (req, res, next)=> {
  res.render('login');
  
});
router.get('/google',passport.authenticate('google',{ scope: ['profile','email'] }));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/')
})

  router.get('/logout',(req, res, next)=> {
    req.logOut();
    res.redirect('/oauth/login/')
  });

module.exports = router;

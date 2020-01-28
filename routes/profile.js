var express = require('express');
var router = express.Router();

/* GET users listing. */
const authCheck = (req,res,next)=>{
    if(!req.user){
       
        res.redirect('/oauth/login')
    }else{
        next();
    }
}
router.get('/', authCheck,(req, res, next)=> {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.render('profile',{user:req.user});
});

module.exports = router;
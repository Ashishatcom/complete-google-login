const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const {User} = require('../models')

passport.serializeUser((user,done)=>{
  done(null , user.id);
});
passport.deserializeUser((id,done)=>{
  //  User.findByPk(id).then((user)=>{
  //   done(null , user.id);
  //  })
  done(null, id);
});

passport.use(
    new GoogleStrategy({
    callbackURL:'/oauth/google/redirect',
      clientID:"{YOUR_CLIENT_ID}",
      clientSecret:"{YOUR_CLIENT_SECRET}"
},(accessToken,refreshToken,profile,done)=>{

  User.findOne({where:{ googleid: profile.id }}).then((userexits)=>{
    if(userexits){
      done(null,userexits)
    }else{  
    User.create({
      googleid: profile.id,
      username:profile.displayName,
      email:profile.emails[0].value
    }).then((user)=>{
      done(null,user)
    }).catch((err)=>{
      console.log(err)
    })
}
      }).catch((err)=>{
        console.log(err)
      })
   console.log(profile)
})
)
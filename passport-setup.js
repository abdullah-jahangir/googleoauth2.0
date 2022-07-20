const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//strategy file
passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "324190561118-iugk59ejh3dj4igu8h8ivq4mknft94k6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/oauth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
    return done(null, profile);
  }
));
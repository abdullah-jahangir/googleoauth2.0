const router = require("express").Router();
const passport = require("passport")
const session = require('express-session');
require('./passport-setup');
// standard logged in method
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
router.get('/', (req, res) =>   res.send('<a href="/oauth/google">Authenticate with Google</a>'));
//routing when google login fails
router.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) => res.send('<div><h1>Welcome ' + req.user.displayName+'</h1> <a href="/oauth/logout">Logout from Google</a></div>'))

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/oauth/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/oauth/good');
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    
    res.redirect('/oauth');
    res.send('logged out')

})
module.exports = {router,isLoggedIn};

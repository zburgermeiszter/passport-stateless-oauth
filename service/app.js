var express = require('express');
var passport = require('passport');
var util = require('util');
var zlib = require('zlib');
var NodeRSA = require('node-rsa');
var fs = require('fs');

var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "58f907375348da52da8f";
var GITHUB_CLIENT_SECRET = "7e41b558ace35dcdecb9bf791b83ca40d2f88494";
var GITHUB_CALLBACK_URL = "http://127.0.1.2/auth/github/callback?setcookieurl=http://127.0.1.1/setcookie.html";

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {

    profile.access_token = accessToken;
    profileCleanup(profile);

    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Initialise RSA
var rsa = new NodeRSA();
rsa.importKey(fs.readFileSync('private.key'));

var app = express();

// configure Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get(
  '/profile',
  function(req, res) {

  }
);

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', {
    scope: [ 'user:email' ],
    session: false
  }));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false
  }),
  function(req, res) {
    if(req.query.setcookieurl === undefined) {
      return res.send('Missing setcookieurl');
    }

    var cookie = prepareCookie(req.user);

    var cookieJSONString = JSON.stringify(cookie);

    //res.cookie('staticmanSocialUser', key.encrypt(req.user, 'base64'));
    res.redirect(req.query.setcookieurl + '#' + new Buffer(cookieJSONString).toString('base64'));
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);



function prepareCookie(profile) {
  var user = {};
  Object.assign(user, profile);

  var publicProfile = {};
  Object.assign(publicProfile, profile);
  delete publicProfile.access_token;

  return {
    secretProfile: zlib.deflateSync(
      rsa.encrypt(
        Buffer.from(
          JSON.stringify(user)
          , 'utf8'
        )
      )
    ).toString('base64'),
    publicProfile: publicProfile
  };
}

function profileCleanup(profile) {
  profile.avatar_url = profile._json.avatar_url;
  profile.gravatar_id = profile._json.gravatar_id;

  delete profile._raw;
  delete profile._json;
}
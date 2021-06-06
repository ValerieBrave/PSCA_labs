const app = require('express')();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session')({resave: false, saveUninitialized: false, secret: '12345678'});

// параметры для выдачи Authorization grant
passport.use(new GoogleStrategy({
    clientID: '3197718547-sfebknc43bcc2ffk567vor5sb85n1r4s.apps.googleusercontent.com',
    clientSecret: 'w2trCMY2FeZzs-x9gbZs9v51',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    (token, refreshToken, profile, done) => done(null, {profile: profile, token: token})
))

passport.serializeUser((user, done) => {
    console.log('serialize: displayName', user.profile.displayName);
    done(null, user)
 })
 passport.deserializeUser((user, done) => {
     console.log('deserialize: displayName', user.profile.displayName);
     done(null, user)
 })

app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => res.redirect('/resource')
);

app.get('/resource', (req, res) => {
   if (req.user) res.status(200).send(`Resource: ${req.user.profile.id}, ${req.user.profile.displayName}`);
   else res.redirect('/login');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.listen(3000, () => console.log('Server is running on 3000'));
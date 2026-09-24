const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // No plain-text credentials are ever stored: GitHub handles the
      // password entirely, and we only keep the public profile in the
      // session (nothing persisted to MongoDB for authentication).
      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

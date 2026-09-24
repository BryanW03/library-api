const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET /login -> redirects to GitHub to authenticate
router.get('/login', passport.authenticate('github'));

// GET /auth/github/callback -> GitHub redirects back here
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.status(200).json({ message: 'Logged in successfully', user: req.user });
  }
);

// GET /logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// GET /login-status -> quick way to check if you're currently authenticated
router.get('/login-status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.status(200).json({ loggedIn: true, user: req.user });
  }
  res.status(200).json({ loggedIn: false });
});

module.exports = router;

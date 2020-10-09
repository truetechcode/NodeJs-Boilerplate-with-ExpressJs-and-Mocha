require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const userData = await User.findById(user.id);

    const validate = await userData.isValidPassword(password);

    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, userData, { message: 'Logged in Successfully' });

  } catch (error) {
    return done(error);
  }
}));

//This verifies that the token sent by the user is valid
passport.use('jwt', new JWTstrategy({
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));

require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const authenticate = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {

        return res.status(403).json({
          'code': 'BAD_REQUEST_ERROR',
          'description': 'Incorrect Email or Password.'
        })
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email, name: user.fullName(), role: user.role, department: user.department };

        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
          user: body
        }, process.env.ACCESS_TOKEN_SECRET);

        return res.json({ token });
      });
    } catch (error) {

      return res.status(401).json({
        'code': 'UNAUTHORIZED_REQUEST_ERROR',
        'description': 'You cannot access this resources.'
      })
    }
  })(req, res, next);
}

const authenticator = () => passport.authenticate('jwt', { session: false })

module.exports = { authenticate, authenticator };
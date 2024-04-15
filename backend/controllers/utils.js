const jwt = require('jsonwebtoken')
const { User, Admin } = require('../models')

const signJWT = (user) => {
  const payload = user
  return jwt.sign(payload, process.env.JWT_SECRET || '!@#$%^&*()', {
    expiresIn: '1d' // expires in 365 days
  })
}

const verifyJWT = (req, res, next) => {
  jwt.verify(req.headers['authorization'], process.env.JWT_SECRET || '!@#$%^&*()', async (err, decoded) => {
    if (err || !decoded) {
      return res.error({}, 'Token is expired');
    }
    let user = {};
    if(decoded.type === "admin") {
      user = await Admin.findOne({
        where: {
          id: decoded.id,
          email: decoded.email
        }
      });

      if (!user) {
        return res.error({}, "Admin not found");
      }
    } else if(decoded.type === "student" || decoded.type === "donar") {
      user = await User.findOne({
        where: {
          id: decoded.id,
          email: decoded.email
        }
      });
      if (!user) {
        return res.error({}, "User not found");
      }
  
      if (user.isVerified !== 'Yes') {
        return res.error({}, "Your account is not verified");
      }
      if (user.status !== 'active') {
        return res.error({}, "Admin has deactivated your account");
      }
    } else {
      return res.error({}, "Type not found.");
    }

    req._id = user['_id'];
    req.user = { ...user.dataValues, type: decoded.type };
    next();
  });
}

module.exports = { signJWT, verifyJWT }

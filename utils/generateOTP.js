const jwt = require('jsonwebtoken');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

function generateTokenWithOTP(obj){
  return jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: '10m'})
}

module.exports = {generateTokenWithOTP, generateOTP};

var jwt = require('jsonwebtoken')

const signToken = (payload) => {
  console.log("check1", payload)
  const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: 24 * 60 * 60})
  console.log("check2", process.env.JWT_TOKEN_SECRET)
  return token
}

const verifyToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
  return payload
}

module.exports = {
  signToken, verifyToken
}
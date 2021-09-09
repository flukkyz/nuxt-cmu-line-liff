const BearerStrategy = require('passport-http-bearer').Strategy;
const axios = require('axios')

module.exports = new BearerStrategy(async (token, done) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    try {
      const getUser = await axios.get(`${process.env.API_URL}${process.env.API_DIR}me`,{headers})
      return done(null, getUser.data)
    } catch (e) {
      console.log(e);
    }
    return done(null, false);
  }
)
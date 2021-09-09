const BearerStrategy = require('passport-http-bearer').Strategy;
const axios = require('axios')

module.exports = new BearerStrategy(async (token, done) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    try {
      const getUser = await axios.get('https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',{headers})
      return done(null, getUser.data)
    } catch (e) {
      console.log(e);
    }
    return done(null, false);
  }
)
const axios = require('axios')

module.exports = {
  sendLocation: async (req, res) => {
    const data = req.body
    const url = 'https://mis-api.cmu.ac.th/slack/v1/CheckIn'
    const token = '3467988de9de4655c93128a53625c'
    try {
      axios.post(url,data,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return  res.json({ status: 'success'});
    } catch (e) {
      res.status(500).json({
        message: 'Cannot GET API #1 '+e
      }) 
    }
  }
}
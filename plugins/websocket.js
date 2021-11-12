const ws = new WebSocket('wss://mis-api.cmu.ac.th/mis/lineapp/ws/api', 'protocol')
ws.onmessage = function (event) {
  console.log(event)
}
ws.onopen = function (event) {
  console.log(event)
  console.log('Successfully connected to the echo websocket server...')
}
export default ({ app }, inject) => {
  inject('ws', ws)
}

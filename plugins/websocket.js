const ws = new WebSocket('ws://10.110.1.68:8889', 'protocol')
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

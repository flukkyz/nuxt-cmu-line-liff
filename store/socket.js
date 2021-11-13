export const state = () => ({
  subscribeReceive: '1245644654646',
  dataSend: null,
  dataReceive: null
})
export const mutations = {
  subscribeReceive (state) {
    state.subscribeReceive = true
  },
  send (state, payload) {
    state.dataSend = payload
  },
  receive (state, payload) {
    state.dataReceive = payload
  }
}

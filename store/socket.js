export const state = () => ({
  subscribeReceive: false,
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

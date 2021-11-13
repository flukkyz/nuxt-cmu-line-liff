export const state = () => ({
  dataSend: null,
  dataReceive: null
})
export const mutations = {
  send (state, payload) {
    state.dataSend = payload
  },
  receive (state, payload) {
    state.dataReceive = payload
  }
}

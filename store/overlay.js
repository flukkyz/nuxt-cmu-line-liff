export const state = () => ({
  overlay: false,
  url: '',
  percent: 0
})
export const mutations = {
  showImage (state, payload) {
    state.overlay = true
    state.url = payload.url
  },
  showProgress (state) {
    state.overlay = true
    state.percent = 0
  },
  updateProgress (state, payload) {
    state.overlay = true
    state.percent = payload
  },
  showLoading (state) {
    state.overlay = true
  },
  hide (state) {
    state.overlay = false
  }
}

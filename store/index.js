export const state = () => ({
  drawer: false,
  dark_mode: false,
  pending_login: false
  // enums: {
  //   home: {
  //     contentJustifies: {
  //       start: 'ซ้าย',
  //       center: 'กลาง',
  //       end: 'ขวา'
  //     },
  //     bgJustifies: {
  //       left: 'ซ้าย',
  //       right: 'ขวา'
  //     }
  //   }
  // },

})

export const mutations = {
  setDrawer (state, val) {
    state.drawer = val
  },
  setDarkMode (state, val) {
    state.dark_mode = val
  },
  setPendingLogin (state, val) {
    state.pending_login = val
  }
}

export const getters = {
}

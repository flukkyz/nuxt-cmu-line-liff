import { io } from 'socket.io-client'
export default ({ app }, inject) => {
  inject('io', io)
}

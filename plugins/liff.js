import LineLiff from '@line/liff'
export default ({ app }, inject) => {
  inject('liff', LineLiff)
}

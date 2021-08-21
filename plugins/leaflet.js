import Vue from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LControlZoom, LControlScale } from 'vue2-leaflet'
import LControlFullscreen from 'vue2-leaflet-fullscreen'

Vue.component('LMap', LMap)
Vue.component('LTileLayer', LTileLayer)
Vue.component('LMarker', LMarker)
Vue.component('LControlZoom', LControlZoom)
Vue.component('LControlScale', LControlScale)
Vue.component('LControlFullscreen', LControlFullscreen)
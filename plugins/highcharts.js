import Vue from 'vue'
import Highcharts from 'highcharts'
import Maps from 'highcharts/modules/map'
import Wordcloud from 'highcharts/modules/wordcloud'
import mapData from '@highcharts/map-collection/countries/th/th-all.geo.json'
import HighchartsVue from 'highcharts-vue'

if (typeof Highcharts === 'object') {
  Wordcloud(Highcharts)
  Maps(Highcharts)
  Highcharts.maps.th = mapData
}

Vue.use(HighchartsVue)

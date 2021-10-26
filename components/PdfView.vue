<template>
  <v-card
    v-if="numPages"
    class="pdf-view"
    elevation="0"
    max-width=""
  >
    <v-toolbar
      color="grey lighten-4"
      class="pdf-tab"
      elevation="0"
      dense
      flat
    >
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            @click.stop="drawer = !drawer"
            v-on="on"
          />
        </template>
        <span>Pages Navigation</span>
      </v-tooltip>
      <v-spacer />
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            :disabled="page === 1"
            class="d-none d-md-flex"
            x-small
            v-bind="attrs"
            v-on="on"
            @click="setPdfPage(1)"
          >
            <v-icon>mdi-skip-backward</v-icon>
          </v-btn>
        </template>
        <span>First page</span>
      </v-tooltip>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            :disabled="page === 1"
            x-small
            class="ml-1 d-none d-md-flex"
            v-bind="attrs"
            v-on="on"
            @click="setPdfPage(page > 1 ? page - 1 : page)"
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
        </template>
        <span>Previous page</span>
      </v-tooltip>
      <div class="mx-3 align-center flex-nowrap d-none d-sm-flex">
        <v-form @submit.prevent="changePage">
          <div class="custom-textbox page-textbox mx-1">
            <input v-model.number="page" type="text">
          </div>
        </v-form>
        <p class="mb-0 per-page">
          / {{ numPages }}
        </p>
      </div>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            x-small
            v-bind="attrs"
            class="mr-1 d-none d-md-flex"
            :disabled="page === numPages"
            v-on="on"
            @click="setPdfPage(page < numPages ? page + 1 : page)"
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </template>
        <span>Next page</span>
      </v-tooltip>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            x-small
            class="d-none d-md-flex"
            v-bind="attrs"
            :disabled="page === numPages"
            v-on="on"
            @click="setPdfPage(numPages)"
          >
            <v-icon>mdi-skip-forward</v-icon>
          </v-btn>
        </template>
        <span>Last page</span>
      </v-tooltip>
      <div class="mx-4 d-none d-sm-flex">
        <v-divider vertical class="py-4" />
      </div>
      <div class="mx-2 d-flex d-sm-none">
        &nbsp;
      </div>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            x-small
            class="d-none d-md-flex"
            v-bind="attrs"
            :disabled="currentZoom === 0"
            v-on="on"
            @click="onZoomOut"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>Zoom out</span>
      </v-tooltip>
      <v-form @submit.prevent="changeZoom">
        <div class="custom-textbox zoom-textbox mx-1">
          <input v-model="zoom" type="text">
        </div>
      </v-form>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            fab
            depressed
            class="d-none d-md-flex"
            x-small
            v-bind="attrs"
            :disabled="currentZoom === zooms.length-1"
            v-on="on"
            @click="onZoomIn"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Zoom in</span>
      </v-tooltip>

      <v-spacer />
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            v-if="!hideSave"
            fab
            depressed
            x-small
            v-bind="attrs"
            v-on="on"
            @click="onDownloadPDF"
          >
            <v-icon>
              mdi-download
            </v-icon>
          </v-btn>
        </template>
        <span>Save</span>
      </v-tooltip>
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn
            v-if="!hidePrint"
            fab
            depressed
            x-small
            class="ml-1 d-none d-md-flex"
            v-bind="attrs"
            v-on="on"
            @click="printPDF"
          >
            <v-icon>
              mdi-printer
            </v-icon>
          </v-btn>
        </template>
        <span>Print</span>
      </v-tooltip>
    </v-toolbar>
    <v-card class="overflow-hidden" elevation="0">
      <v-navigation-drawer
        v-model="drawer"
        :color="navigationColor"
        absolute
        temporary
        hide-overlay
        width="300"
      >
        <v-list class="py-0">
          <v-list-item-group>
            <v-list-item v-for="i in numPages" :key="i">
              <v-list-item-content class="px-16 py-5" @click="setPdfPage(i)">
                <pdf :src="srcObjs" :page="i" />
                <v-list-item-title class="text-center white--text mt-1 mb-0">
                  {{ i }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card
        :id="`pdfs-${_uid}`"
        :color="bgColor"
        class="px-1"
        :height="height"
        style="overflow-x: scroll"
        elevation="0"
      >
        <pdf
          v-for="i in numPages"
          :id="`pdf-${_uid}-${i}`"
          :key="i"
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }"
          :data-page="i"
          :src="srcObjs"
          class="mb-3 mt-1 mx-auto"
          :style="`display: block; width: ${pdfWidth}`"
          :page="i"
        />
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '500'
    },
    bgColor: {
      type: String,
      default: 'info lighten-1'
    },
    navigationColor: {
      type: String,
      default: 'info'
    },
    hideSave: {
      type: Boolean,
      default: false
    },
    hidePrint: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      srcObjs: null,
      numPages: null,
      page: 1,
      lastPage: 1,
      pdfWidth: '75%',
      zooms: [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500],
      currentZoom: 4,
      zoom: '75%',
      lastZoom: 75,
      drawer: false
    }
  },
  mounted () {
    this.srcObjs = this.$pdf.createLoadingTask(this.src)

    this.srcObjs.promise.then((pdf) => {
      this.numPages = pdf.numPages
    })
  },
  methods: {
    onDownloadPDF () {
      const fileLink = document.createElement('a')
      fileLink.href = this.src
      fileLink.click()
    },
    printPDF () {
      this.$printjs(this.src)
    },
    changePage () {
      const page = Number.parseInt(this.page)
      if (!isNaN(page)) {
        if (page < 1) {
          this.setPdfPage(1)
        } else if (page > this.numPages) {
          this.setPdfPage(this.numPages)
        } else {
          this.setPdfPage(page)
        }
      } else {
        this.setPdfPage(this.lastPage)
      }
    },
    setPdfPage (page) {
      this.page = page
      this.lastPage = page
      this.$vuetify.goTo(`#pdf-${this._uid}-${this.page}`, {
        container: `#pdfs-${this._uid}`,
        offset: -60,
        duration: 0
      })
    },
    onZoomOut () {
      const currentScale = Number.parseInt(this.zoom.split('%')[0])
      this.currentZoom = this.$_.findLastIndex(this.zooms, ele => ele < currentScale)
      this.setPdfWidth()
    },
    onZoomIn () {
      const currentScale = Number.parseInt(this.zoom.split('%')[0])
      this.currentZoom = this.$_.findIndex(this.zooms, ele => ele > currentScale)
      this.setPdfWidth()
    },
    changeZoom () {
      const width = Number.parseInt(this.zoom)
      if (!isNaN(width)) {
        if (width <= 25) {
          this.currentZoom = 0
          this.setPdfWidth()
        } else if (width >= 500) {
          this.currentZoom = this.zooms.length - 1
          this.setPdfWidth()
        } else {
          this.currentZoom = this.$_.findLastIndex(this.zooms, ele => ele < width)
          if (this.currentZoom === 0) {
            this.currentZoom = 1
          }
          this.setPdfWidth(width)
        }
      } else {
        this.setPdfWidth(this.lastZoom)
      }
    },
    setPdfWidth (width = null) {
      this.zoom = width !== null ? `${width}%` : `${this.zooms[this.currentZoom]}%`
      this.lastZoom = width
      this.pdfWidth = this.zoom
    },
    onIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.page = Number.parseInt(entry.target.dataset.page)
          this.lastPage = Number.parseInt(entry.target.dataset.page)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.per-page{
  white-space: nowrap;
  font-size: 15px;
}
.custom-textbox > input{
  border: solid 1px #eee;
  border-radius: 4px;
  text-align: center;
  font-size: 15px;
  padding: 3px 0px;
}
.zoom-textbox > input{
  width: 55px;
}
.page-textbox > input{
  width: 30px;
}
.pdf-view .v-sheet.v-card {
  border-radius: 0px;
}
.pdf-tab{
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>

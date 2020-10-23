<template>
    <div class="row col-12 justify-center">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 bg-grey-1 q-pa-lg">

            <div class="row q-pt-md">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <p>Chose a backup time</p>
                    <q-scroll-area
                        ref="scroll"
                        id="scroll"
                        :visible="true"
                        horizontal
                        style="height: 174px; width: 100%;"
                        class="bg-white rounded-borders shadow-1"
                      >
                      <q-scroll-observer horizontal @scroll="scrollHandler" />
                      <div
                        class="example-item row no-wrap"
                      >
                        <div
                          v-for="(item, index) in data"
                          :key="index"
                          class="restore-time q-mt-sm col-4 q-pt-sm cursor-pointer"
                          style="width: 140px; height: 140px;"
                          @click="select(index)"
                          :ref="'restore-' + index"
                        >
                        <div
                          class="text-center" src="https://cdn.quasar.dev/img/mountains.jpg">
                          <div class="q-pa-sm q-ma-sm bg-grey-3 shadow-1">
                            <p>{{ (index == 0) ? 'Today' : (index == 1) ? 'Yesterday' : ((index) + ' days ago ') }}</p>
                            <p>{{ index + 1 }}:6{{ index }}</p>
                          </div>
                          <div
                            :ref="`restore-border-${index}`"
                            style="border-bottom: 2px solid #000">
                            <i aria-hidden="true"
                              role="presentation"
                              class="material-icons q-icon notranslate"
                              :class="item.selected ? 'text-green' : 'text-dark'"
                              style="margin-bottom: -18.5px;font-size: 22px;margin-right: -22px;">circle</i>
                            <i aria-hidden="true"
                              :ref="`restore-border-circle-1${index}`"
                              role="presentation"
                              class="material-icons q-icon notranslate"
                              :class="item.selected ? 'text-green' : 'text-grey-1'"
                              style="margin-bottom: -18.5px; margin-left: 4px;">circle</i>
                          </div>
                        </div>
                        </div>
                      </div>
                    </q-scroll-area>
                </div>
            </div>

            <div class="q-pt-md">
                <file-tree ref="fileTree" :onFileTicked="onFileTicked" :excludedFiles="false" />
            </div>

            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-banner class="bg-grey-3 q-pa-md">
                    <template v-slot:avatar>
                      <q-icon name="cloud_download" color="primary" />
                    </template>
                    <p><b>Selected files to restore</b></p>
                    <!-- template v-slot:action>
                      <q-btn flat color="primary" label="Settings" @click="dend" />
                    </template -->

                    {{ tickedFiles.length * 1000 }} MB {{ tickedFiles.length }} file(s) selected
                  </q-banner>
              </div>
          </div>

            <div class="row col-12 q-pt-sm q-pa-md">
              <q-btn @click="dend(); $router.go(-1);" color="primary">Restore</q-btn>
              <q-btn flat @click="$router.go(-1)">Cancel</q-btn>
            </div>
        </div>
    </div>
</template>

<style>
  .restore-time:hover {
    /* background-color: rgba(0, 0, 0, 0.1) !important; */
  }
</style>

<script>
import FileTree from './FileTree'

export default {
  components: {
    FileTree
  },
  name: 'PageRestore',
  data () {
    return {
      data: [],
      selected: [],
      tickedFiles: [],
      selectable: true,

      scroll: 0,
      mouse: {
        down: false,
        diff: 0,
        layerX: 0,
        incX: 0
      }
    }
  },
  created () {
    for (let i = 0; i < 33; i++) {
      this.data.push({ selected: false })
    }

    this.data[0].selected = true
  },
  mounted () {
    this.tickedFiles = this.$refs.fileTree.getTickedFiles()

    if (!this.$q.platform.is.mobile) {
      const scroll = document.getElementById('scroll')

      scroll.addEventListener('mousedown', (e) => {
        e.preventDefault()
        this.mouse.down = true

        this.mouse.layerX = e.layerX
      })

      scroll.addEventListener('mousemove', (e) => {
        if (this.mouse.down) {
          this.mouse.incX += this.mouse.layerX - e.layerX
          this.$refs.scroll.setScrollPosition(this.mouse.incX)
        }
      })

      scroll.addEventListener('mouseup', (e) => {
        console.log(this.mouse.incX)
        this.selectable = this.mouse.incX === 0

        console.log(this.selectable)

        this.mouse.incX = 0
        this.mouse.down = false
      })

      scroll.addEventListener('mouseleave', (e) => {
        this.mouse.incX = 0
        this.mouse.down = false
      })
    }
  },
  methods: {
    dend () {
      this.$q.notify({
        color: 'green',
        position: 'top',
        textColor: 'white',
        icon: 'info',
        message: 'Restored'
      })
    },
    onFileTicked (files) {
      this.tickedFiles = files
    },
    select (index) {
      if (this.selectable) {
        this.data.map((r) => { r.selected = false; return r })
        this.data[index].selected = true

        this.selected.includes(index) ? this.selected.splice(this.selected.indexOf(index), 1) : this.selected.push(index)

        // console.log(this.$refs[`restore-border-${index}`])
        // this.$refs[`restore-border-${index}`][0].style = 'border-bottom: 2px solid #7dcea0; !important'

        this.$refs.fileTree.shuffle()
      }
    },
    scrollHandler (e) {
    }
  }
}
</script>

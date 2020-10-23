<template>
    <div class="row col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 justify-center">
      <div class="col-12 q-pl-md q-pr-md">
        <h5>{{ $route.name }}</h5>
      </div>

      <div class="col-12 q-pa-md">
        <q-card v-for="(item, i) in data" :key="i" flat bordered
          class="my-card q-mb-sm bg-grey-1">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ item.volume }}</div>
                <div class="text-subtitle2">Quota {{ item.quota }}</div>
              </div>

              <div class="col-auto row">
                <q-toggle @input="save" v-model="item.select">
                </q-toggle>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            Saving backups to drive <b>{{ item.to }}</b>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <div class="row col-12">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pt-sm">
                <q-btn @click="$router.push(`/config/fileSystem/${encodeURIComponent(item.volume)}/exclude`)" class="q-mr-sm">Exclude</q-btn>
                <q-btn @click="medium = true" class="q-mr-sm">Change</q-btn>
                <q-btn @click="modal.settings.show = true" color="primary" icon="settings"></q-btn>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pt-sm">
                <q-select @input="save" color="teal" style="width: 100%;" filled v-model="item.period" :options="period.options" label="Backup every">
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </div>

      <!-- Source -->

      <q-dialog
        v-model="medium"
      >
        <div style="width: 1000px" class="col-12 row">
        <div class="row col-12 bg-grey-1 q-pa-sm">
          <div class="col-10">
            <b>Select source</b>
          </div>
          <div class="col-2 text-right">
            <q-btn icon="close" size="md" flat round dense v-close-popup />
          </div>
        </div>
         <q-card flat square
          @click="medium = false"
          class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pa-sm cursor-pointer my-card" v-for="(item, i) in cards" :key="i">
            <q-card-section horizontal>
              <img
                class="col-5"
                :src="item.img"
                style="width: 124px;"
              />

              <q-card-section>
                <q-linear-progress style="width: 64px;" size="10px" :value="item.progress" class="bg-grey-1" />
                <p>{{ item.l }}</p>
                <p>{{ item.d }}</p>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        </q-dialog>

      <!-- Settings -->

      <q-dialog
        v-model="modal.settings.show"
      >
        <div style="width: 640px" class="col-12 row">
          <div class="row col-12 bg-grey-1 q-pa-sm">
            <div class="col-10">
              <b>Settings</b>
            </div>
            <div class="col-2 text-right">
              <q-btn icon="close" size="md" flat round dense v-close-popup />
            </div>
          </div>

          <div class="col-12 q-pa-sm bg-white">
            <q-card square flat
              class="col-12 q-pa-sm bs-border-grey">
              <p>Select backup target folder</p>
               <q-form
                class="q-gutter-md row col-12"
              >
              <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 q-pr-sm">
                  <q-input
                    filled
                    v-model="modal.settings.input.name"
                    label="Folder name"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pt-md">
                  <input type="file" webkitdirectory directory multiple/>
                </div>
              </div>

              <div class="row col-12">
                <div class="col-11">
                  <q-input
                    filled
                    disable
                    v-model="modal.settings.input.username"
                    label="Username"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Please type...',
                      val => val > 0 && val < 100 || 'Please type ...'
                    ]"
                  />
                </div>
                <div class="col-11">
                  <q-input
                    filled
                    disable
                    v-model="modal.settings.input.password"
                    label="Password"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Please type...',
                      val => val > 0 && val < 100 || 'Please type ...'
                    ]"
                  />
                </div>
              </div>

              </q-form>
            </q-card>

            <q-card class="q-pa-sm q-mt-sm bs-border-grey" square flat>
              <q-item-section>
                <q-item-label>
                  Defuned user quota <q-checkbox v-model="modal.settings.input.quota" />
                </q-item-label>
              </q-item-section>

              <q-separator />

              <div class="row col-12">
                <q-input
                  type="number"
                  filled
                  :disable="!modal.settings.input.quota"
                  v-model="modal.settings.input.quotaIn"
                  label="Auto quota..."
                  lazy-rules
                  :rules="[]"
                  style="width: 100%;"
                />
              </div>
            </q-card>

            <q-card class="q-pa-sm q-mt-sm bs-border-grey" square flat>
              <q-item-section>
                <q-item-label>
                  Write throttling <q-checkbox v-model="modal.settings.input.throttle" />
                </q-item-label>
              </q-item-section>

              <q-separator />

              <div class="row col-12">
                <q-input
                  filled
                  :disable="!modal.settings.input.throttle"
                  v-model="modal.settings.input.throttleIn"
                  label="Auto quota..."
                  :rules="[
                    val => {
                      if (val.length > 0) {

                        for (let i = 0; i < val.length; i++) {
                          if (!val[i].match(/^[0-9]*$/gi)) {
                            modal.settings.input.throttleIn = ''
                            return false
                          }
                        }

                        if (val.split('').reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)) === 0) {
                          modal.settings.input.throttleIn = ''; return false
                        }

                        if (val > 100) {
                          modal.settings.input.throttleIn = 100; return false
                        }
                      }
                      else {
                        return false
                      }
                    }
                  ]"
                  style="width: 100%;"
                />
              </div>
            </q-card>
          </div>

          <div class="row col-12 bg-grey-1 q-pa-sm">
            <div class="col-12 text-left">
              <q-btn label="save" color="primary" size="md" v-close-popup />
            </div>
          </div>
        </div>
        </q-dialog>
    </div>
</template>

<style>
  .my-card:hover {
    background-color: #ccc;
  }
</style>

<script>
export default {
  name: 'PageFsExclude',
  data: () => {
    return {
      medium: false,

      modal: {
        settings: {
          show: false,
          input: {
            name: 'C:/Users/SampelUser/Backup',
            age: '',
            username: '',
            password: '',
            quota: false,
            quotaIn: 0,
            throttle: false,
            throttleIn: 0
          }
        }
      },

      cards: [
        { l: 'Local machine', d: '178.1 GB free out of 320.9 GB', img: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Crystal_Project_harddrive.png', progress: 0.1 },
        { l: 'Dropbox', d: '', img: 'https://cfl.dropboxstatic.com/static/images/logo_catalog/twitter-card-glyph_m1%402x.png', progress: 0.5 },
        { l: 'Google drive', d: '64 Gb left', img: 'https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png', progress: 0.2 },
        { l: 'Amazon s3', d: '128 GB left', img: 'https://cdn.cyberduck.io/img/s3.png', progress: 0.6 },
        { l: 'Network', d: '', img: 'https://cdn0.iconfinder.com/data/icons/data-recovery-flat/58/015_-_Hard_Drive_Network-512.png', progress: 0.1 },
        { l: 'Other', d: '', img: 'https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png', progress: 0.8 }
      ],

      lorem: 'Lorem ipsum dolor sit amet, con...',
      period: {
        options: ['1 hour', '2 hours', '3 hours', '4 hours', '6 hours', '8 hours', '12 hours', '24 hours']
      },
      data: [
        {
          select: true,
          volume: 'C:/',
          to: 'D:/',
          quota: 'Auto',
          btn0: 24,
          btn1: 4.0,
          btn2: 24,
          period: {
            label: '1 hour',
            value: 1
          }
        },
        {
          select: false,
          volume: 'D:/',
          to: 'Undefined target',
          quota: '64GB',
          btn0: 24,
          btn1: 4.0,
          btn2: 24,
          period: {
            label: '2 hours',
            value: 2
          }
        }
      ]
    }
  },
  methods: {
    save () {
      this.$q.notify({
        color: 'green',
        position: 'top',
        textColor: 'white',
        icon: 'check',
        message: 'Changes saved'
      })
    }
  }
}
</script>

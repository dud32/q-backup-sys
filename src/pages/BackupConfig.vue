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
                <q-btn @click="save" class="q-mr-sm">Change</q-btn>
                <q-btn @click="save" color="primary" icon="settings"></q-btn>
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
    </div>
</template>

<script>
export default {
  name: 'PageFsExclude',
  data: () => {
    return {
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

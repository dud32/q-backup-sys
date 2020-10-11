<template>
    <div class="row col-12 justify-center">
        <h4>{{ $route.name }}</h4>

        <div class="col-10">
          <q-card v-for="(item, i) in data" :key="i" flat bordered
            class="my-card q-mb-sm bg-grey-1">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">{{ item.volume }}</div>
                  <div class="text-subtitle2">Quota {{ item.quota }}</div>
                </div>

                <div class="col-auto">
                  <q-toggle v-model="item.select">
                  </q-toggle>
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              Saving backups to drive <b>{{ item.to }}</b>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn>Exclude</q-btn>
              <q-btn>Change</q-btn>
              <q-btn color="primary" icon="settings">Advanced</q-btn>
            </q-card-actions>
          </q-card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageBackupConfig',
  data: () => {
    return {
      lorem: 'Lorem ipsum dolor sit amet, con...',
      data: [
        {
          select: true,
          volume: 'C:/',
          to: 'D:/',
          quota: 'Auto',
          btn0: 24,
          btn1: 4.0,
          btn2: 24
        },
        {
          select: false,
          volume: 'C:',
          to: 'Undefined target',
          quota: '64GB',
          btn0: 24,
          btn1: 4.0,
          btn2: 24
        }
      ]
    }
  }
}
</script>

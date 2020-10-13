<template>
    <div class="row col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 justify-center">
      <div class="col-12 q-pl-md q-pr-md">
        <h5>{{ $route.name }} for drive <span class="text-grey">{{ $route.params.drive }}</span></h5>
      </div>

      <div class="col-12 q-pa-md bg-grey-1">
        <div class="row">
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-md">
            <q-tree class="col-12 col-sm-6"
              :nodes="simple"
              node-key="label"
              tick-strategy="leaf"
              :selected.sync="selected"
              :ticked.sync="ticked"
              :expanded.sync="expanded"
            />
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md">
            <div class="text-h6">Selected</div>
              <div>{{ selected }}</div>

              <q-separator spaced />

              <div class="text-h6">Exclude</div>
              <div>
                <div v-for="tick in ticked" :key="`ticked-${tick}`">
                  - {{ tick }}
                </div>
              </div>

              <q-separator spaced />

              <div class="text-h6">Expanded</div>
              <div>
                <div v-for="expand in expanded" :key="`expanded-${expand}`">
                  {{ expand }}
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="row col-12 q-pa-md">
        <q-btn @click="save(); $router.go(-1);" color="primary">save</q-btn>
        <q-btn flat @click="$router.go(-1)">Cancel</q-btn>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PageFileSystem',
  data: () => {
    return {
      simple: [
        {
          label: 'C:',
          icon: 'folder',
          children: [
            {
              label: 'Documents',
              icon: 'folder',
              children: [
                { label: 'Quality ingredients', icon: 'description' },
                { label: 'Good recipe', icon: 'description' }
              ]
            },
            {
              label: 'Music (disabled)',
              disabled: false,
              icon: 'folder',
              children: [
                { label: 'Prompt attention', icon: 'description' },
                { label: 'Professional waiter', icon: 'description' }
              ]
            },
            {
              label: 'Software',
              icon: 'folder',
              children: [
                { label: 'Happy atmosphere', icon: 'description' },
                { label: 'Good table presentation', icon: 'description' },
                { label: 'Pleasing decor', icon: 'description' }
              ]
            },
            {
              label: 'Games',
              icon: 'folder',
              children: [
                { label: 'Happy', icon: 'description' },
                { label: 'Good', icon: 'description' }
              ]
            },
            {
              label: 'Misc',
              icon: 'folder',
              children: [
                { label: 'Pleasing decor - 001', icon: 'description' },
                { label: 'Pleasing decor - 002', icon: 'description' },
                { label: 'Pleasing decor - 003', icon: 'description' },
                { label: 'Pleasing decor - 004', icon: 'description' }
              ]
            }
          ]
        }
      ],
      selected: 'Pleasant surroundings',
      ticked: ['Quality ingredients', 'Good table presentation'],
      expanded: ['C:', 'Documents', 'Music (disabled)', 'Software']
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

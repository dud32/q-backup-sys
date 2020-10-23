<template>
    <div class="row col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 justify-center bg-grey-1">
      <div class="col-12 q-pl-md q-pr-md">
        <h5>{{ $route.name }} for drive <span class="text-grey">{{ $route.params.drive }}</span></h5>
      </div>

      <div class="col-12 q-pa-md">
        <file-tree :excludedFiles="true" />
      </div>

      <div class="row col-12 q-pa-md">
        <div class="col-10">
          <q-select
            ref="extension"
            @input-value="call"
            label="Exclude file extensions (.pdf, .exe...)"
            filled
            v-model="modelAddUnique"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            style="width: 100%"
          />
        </div>
        <div class="col-2">
          <q-btn class="q-ml-sm" color="primary" label="add" @click="add" style="width: 100%; height: 100%"></q-btn>
        </div>
      </div>

      <div class="row col-12 q-pa-md">
        <div class="col-10">
          <q-input
            filled
            label="Exclude files/folders larger than"
            v-model="excludeFileSize"
            :rules="[
              val => {
                if (val.length > 0) {

                  for (let i = 0; i < val.length; i++) {
                    if (!val[i].match(/^[0-9]*$/gi)) {
                      excludeFileSize = ''
                      return false
                    }
                  }

                  if (val.split('').reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)) === 0) {
                    excludeFileSize = ''; return false
                  }

                  if (val > 100) {
                    excludeFileSize = 100; return false
                  }
                }
                else {
                  return false
                }
              }
            ]"
          />
        </div>
        <div class="col-2">
          <q-select class="q-ml-sm" v-model="sunit" :options="units" color="primary"
            label="Unit" style="width: 100%; height: 100%"></q-select>
        </div>
      </div>

      <div class="row col-12 q-pt-sm q-pa-md">
        <q-btn @click="save(); $router.go(-1);" color="primary">save</q-btn>
        <q-btn flat @click="$router.go(-1)">Cancel</q-btn>
      </div>
    </div>
</template>

<script>
import FileTree from './FileTree'
export default {
  name: 'PageFileSystem',
  components: {
    FileTree
  },
  data: () => {
    return {
      modelAdd: null,
      modelAddUnique: ['.pdf', '.exe'],
      modelToggle: null,
      modelCurrentValue: '',

      excludeFileSize: 0,

      sunit: 'MB',

      units: [
        'KB',
        'MB',
        'GB'
      ],

      simple: [
        {
          label: 'C:',
          icon: 'folder',
          children: [
            {
              label: 'Documents',
              icon: 'folder',
              children: [
                {
                  label: 'Quality ingredients',
                  icon: 'folder',
                  children: [
                    { label: 'Random file - 001', icon: 'description' },
                    { label: 'Random file - 002', icon: 'description' },
                    { label: 'Random file - 003', icon: 'description' },
                    { label: 'Random file - 004', icon: 'description' }
                  ]
                },
                { label: 'Good recipe', icon: 'description' }
              ]
            },
            {
              label: 'Music (disabled)',
              disabled: false,
              icon: 'folder',
              children: [
                { label: 'Prompt attention', icon: 'audiotrack' },
                { label: 'Professional waiter', icon: 'library_music' }
              ]
            },
            {
              label: 'Software',
              icon: 'folder',
              children: [
                {
                  label: 'Software sub-folder',
                  icon: 'folder',
                  children: [
                    {
                      label: 'Random folder',
                      icon: 'folder',
                      children: [
                        { label: 'Random file - 011', icon: 'description' },
                        { label: 'Random file - 012', icon: 'description' },
                        { label: 'Random file - 013', icon: 'description' },
                        { label: 'Random file - 014', icon: 'description' }
                      ]
                    },
                    { label: 'Random file - 012', icon: 'description' },
                    { label: 'Random file - 013', icon: 'description' },
                    { label: 'Random file - 014', icon: 'description' }
                  ]
                },
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
            },
            {
              label: 'Shared',
              icon: 'folder_shared',
              children: [
                { label: 'Pleasing decor - 011', icon: 'description' },
                { label: 'Pleasing decor - 012', icon: 'description' },
                { label: 'Pleasing decor - 013', icon: 'description' },
                { label: 'Pleasing decor - 014', icon: 'description' }
              ]
            }
          ]
        }
      ],
      selected: 'Pleasant surroundings',
      ticked: ['Quality ingredients', 'Good table presentation'],
      expanded: ['C:', 'Documents', 'Music (disabled)', 'Software'],
      filter: ''
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
    },

    call (val) {
      if (val.length > 0) this.modelCurrentValue = val
    },

    add (val) {
      this.modelAddUnique.push(this.modelCurrentValue)
    },

    myFilterMethod (node, filter) {
      const filt = filter.toLowerCase()
      return node.label && node.label.toLowerCase().indexOf(filt) > -1
    },

    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    }
  }
}
</script>

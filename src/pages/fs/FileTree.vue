<template>
  <div class="row">
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 bg-grey-1 q-pa-md" :class="!excludedFiles ? 'col-xl-12 col-lg-12 col-md-12' : ''">
       <q-input
          ref="filter"
          filled
          v-model="filter"
          label="Search - files or folders"
        >
          <template v-slot:append>
            <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
          </template>
        </q-input>
      <q-tree class="col-12 col-sm-6"
        :nodes="simple"
        node-key="label"
        tick-strategy="leaf"
        :selected.sync="selected"
        :ticked.sync="ticked"
        :expanded.sync="expanded"
        :filter="filter"
        :filter-method="myFilterMethod"
        @update:ticked="onFileTicked"
      />
    </div>

    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md" v-show="excludedFiles">
      <!-- div class="text-h6">Selected</div>
        <div>{{ selected }}</div -->

        <div>
          <div class="text-h6">Excluded files</div>
          <div v-for="tick in ticked" :key="`ticked-${tick}`">
            - {{ tick }}
          </div>
        </div>

        <q-separator spaced />

        <!-- div class="text-h6">Expanded</div>
        <div>
          <div v-for="expand in expanded" :key="`expanded-${expand}`">
            {{ expand }}
          </div>
        </div -->
    </div>
  </div>
</template>

<script>
import helper from './../../libs/helper'

export default {
  name: 'PageFileSystem',
  props: {
    excludedFiles: Boolean,
    onFileTicked: {
      type: Function,
      defualt: () => {}
    }
  },
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
                {
                  label: 'Quality ingredients',
                  icon: 'folder',
                  children: [
                    { label: 'Random file - 001', icon: 'description', size: 10 },
                    { label: 'Random file - 002', icon: 'description', size: 10 },
                    { label: 'Random file - 003', icon: 'description', size: 28 },
                    { label: 'Random file - 004', icon: 'description', size: 10 }
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
                  size: 800,
                  children: [
                    {
                      label: 'Random folder',
                      icon: 'folder',
                      size: 200,
                      children: [
                        { label: 'Random file - 011', icon: 'description', size: 14 },
                        { label: 'Random file - 012', icon: 'description', size: 23 },
                        { label: 'Random file - 013', icon: 'description', size: 32 },
                        { label: 'Random file - 014', icon: 'description', size: 41 }
                      ]
                    },
                    { label: 'Random file - 012', icon: 'description', size: 32 },
                    { label: 'Random file - 013', icon: 'description', size: 32 },
                    { label: 'Random file - 014', icon: 'description', size: 32 }
                  ]
                },
                { label: 'Good table presentation', icon: 'description', size: 64 },
                { label: 'Pleasing decor', icon: 'description', size: 64 }
              ]
            },
            {
              label: 'Games',
              icon: 'folder',
              size: 128,
              children: [
                { label: 'Happy', icon: 'description', size: 64 },
                { label: 'Good', icon: 'description', size: 64 }
              ]
            },
            {
              label: 'Misc',
              icon: 'folder',
              size: 124,
              children: [
                { label: 'Pleasing decor - 001', icon: 'description', size: 48 },
                { label: 'Pleasing decor - 002', icon: 'description', size: 48 },
                { label: 'Pleasing decor - 003', icon: 'description', size: 48 },
                { label: 'Pleasing decor - 004', icon: 'description', size: 48 }
              ]
            },
            {
              label: 'Shared',
              icon: 'folder_shared',
              size: 324,
              children: [
                { label: 'Pleasing decor - 011', icon: 'description', size: 81 },
                { label: 'Pleasing decor - 012', icon: 'description', size: 81 },
                { label: 'Pleasing decor - 013', icon: 'description', size: 81 },
                { label: 'Pleasing decor - 014', icon: 'description', size: 81 }
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
    },

    getSelectedFiles () {
      return this.selected
    },

    getTickedFiles () {
      return this.ticked
    },

    // todo: remove me
    shuffle () {
      this.simple[0].children = helper.arr.shuffle(this.simple[0].children)

      this.filter = ' '

      setTimeout(() => {
        this.filter = ''
      }, 100)
    }
  }
}
</script>

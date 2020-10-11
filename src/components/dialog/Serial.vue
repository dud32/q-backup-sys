<template>
  <q-dialog v-model="show" persistent :maximized="true">
    <q-card>
      <q-card-section class="row items-center">
        <div class="row col-12 justify-center">
         <q-form
            @submit="onSubmit"
            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-md bg-grey-1"
          >

          <q-avatar icon="lock" color="primary" text-color="white" class="q-mb-md">
          </q-avatar>

          <p>Please enter the serial key...</p>

          <q-input
              filled
              v-model="serial"
              label="Serial number"
              mask="XXXX - XXXX - XXXX - XXXX"
              hint="Mask: XXXX - XXXX- XXXX - XXXX"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter serial key.']"
              class="q-pb-lg"
            />

            <q-input
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type email.']"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div class="q-pt-md">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'Serial',
  props: {
    data: Array,
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      accept: false,
      show: true,
      name: '',
      age: null,
      email: null,
      serial: null
    }
  },
  created () {
  },
  computed: {},
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'check',
          message: 'Activated'
        })

        this.show = false
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<template>
    <div class="row col-12 justify-center">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 bg-grey-1 q-pa-lg">
            <div class="row q-pt-md">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-banner class="bg-grey-3">
                      <template v-slot:avatar>
                        <q-icon name="storage" color="primary" />
                      </template>
                        <p>Storage settings</p>
                      <template v-slot:action>
                        <q-btn flat color="primary" label="Edit" @click="$router.push('/config/backup')" />
                      </template>
                    </q-banner>
                </div>
            </div>
            <div class="row">
                <div class="col-12 q-pt-lg">
                    <q-separator />
                </div>
            </div>
            <div class="row q-pt-md">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-banner class="bg-grey-3">
                      <template v-slot:avatar>
                        <q-icon name="info" color="primary" />
                      </template>
                        <p><b>Status</b></p>

                        <p class="no-padding no-margin">Protected since: Mar 10, 2020</p>
                        <p class="no-padding no-margin">To backup: 64 GB</p>
                        <p class="no-padding no-margin">No backups made yet</p>
                      <template v-slot:action>
                        <q-btn flat color="primary" label="Settings" />
                      </template>
                    </q-banner>
                </div>
            </div>
            <div class="row">
                <div class="col-12 q-pt-lg">
                    <q-separator />
                </div>
            </div>
            <div class="row q-pt-md">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-banner class="bg-grey-3">
                      <template v-slot:avatar>
                        <q-icon name="refresh" color="primary" />
                      </template>
                      <p><b>Zinstall Periodic backups</b></p>
                        <p class="no-padding no-margin">- Hourly backups for the past 25 hours
                        </p>
                        <p class="no-padding no-margin">- Daily backups per past weeks
                        </p>
                        <p class="no-padding no-margin">- Weekly backups...
                        </p>
                      <template v-slot:action>
                        <q-btn flat color="primary" label="Settings" />
                      </template>
                    </q-banner>
                </div>
            </div>
            <div class="row">
                <div class="col-12 q-pt-lg">
                    <q-separator />
                </div>
            </div>
            <div class="row q-pt-md">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-banner class="bg-grey-3">
                      <template v-slot:avatar>
                        <q-icon name="restore" color="primary" />
                      </template>
                      <p><b>Restore backups</b></p>
                        <p class="no-padding no-margin">Restore to any saved point in time</p>
                      <template v-slot:action>
                        <q-btn flat color="primary" label="Restore" />
                      </template>
                    </q-banner>
                </div>
            </div>
        </div>
        <serial-dialog />
    </div>
</template>

<script>
import SerialDialog from './../components/dialog/Serial'
export default {
  components: {
    SerialDialog
  },
  name: 'PageIndex'
}
</script>

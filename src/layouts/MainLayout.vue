<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: linear-gradient(0deg, rgb(170 230 0) 0%, rgb(173, 209, 71) 100%)">
        <!-- q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        / -->

         <img
          style="height: auto; width: 64px; border-radius: 50%"
          class="cursor-pointer"
          src="001.png"
          @click="$router.push('/')"
         />
        <q-toolbar-title class="text-left text-accent" style="font-size: 16px;">
        </q-toolbar-title>

        <q-toggle size="xl"
          class="q-pr-md"
          v-model="toggle"
          :label="'Backup ' + (toggle ? 'on' : 'off')"
          color="green"
          checked-icon="check"
          unchecked-icon="clear" />

        <q-separator vertical inset />

        <q-btn dense round flat icon="search" class="text-white q-ma-sm"></q-btn>

        <q-btn
          flat
          dense
          round
          icon="account_circle"
          class="text-white text-right"
          style="font-size: 16px;"
          aria-label="Menu"
        >
        <q-popup-proxy ref="LoginProxy" :offset="[0, 0]">
          <q-banner @click="$refs.LoginProxy.hide()" class="text-black no-padding">
            <q-list>
              <q-item>
                <q-item-section><span>
                  Welcome test@user.com
                </span></q-item-section>
              </q-item>

             <q-separator></q-separator>

              <q-item to="/myAccount" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="account_box"></q-icon>
                </q-item-section>
                <q-item-section>
                  My account
                </q-item-section>
              </q-item>

              <q-item to="/login" clickable v-ripple>
                <q-item-section avatar>
                <q-icon name="exit_to_app"></q-icon>
                </q-item-section>
                <q-item-section>
                  Logout
                </q-item-section>
              </q-item>
            </q-list>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
      </q-toolbar>
    </q-header>

    <!-- q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer -->

    <q-page-container class="layout">
      <div class="row justify-center">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  }
]

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      toggle: true,
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

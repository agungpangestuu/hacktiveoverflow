<template>
  <q-layout
    ref="layout"
    :view="layoutStore.view"
    :left-breakpoint="layoutStore.leftBreakpoint"
    :right-breakpoint="layoutStore.rightBreakpoint"
    :reveal="layoutStore.reveal"
  >
    <q-toolbar slot="header" inverted>
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Quasar Layout
        <span slot="subtitle">Empowering your app</span>
      </q-toolbar-title>
      <!-- <q-btn class="within-iframe-hide" flat @click="$router.replace('/showcase')" style="margin-right: 15px">
        <q-icon name="keyboard_arrow_left" />
        Go back
      </q-btn> -->
      <q-btn class="within-iframe-hide" flat @click="$refs.layoutModal.open()" style="margin-right: 15px">
        <q-icon name="account_circle" color="primary" />
        Login
      </q-btn>
      <q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <q-modal-layout>
          <q-toolbar slot="header">
            <q-btn flat @click="$refs.layoutModal.close()">
              <q-icon name="keyboard_arrow_left" />
            </q-btn>
            <div class="q-toolbar-title">
              Header
            </div>
          </q-toolbar>
          <div class="layout-padding">
            <form-login />
          </div>
        </q-modal-layout>
      </q-modal>
    </q-toolbar>

    <q-tabs slot="navigation" v-if="!layoutStore.hideTabs" inverted>
      <q-route-tab slot="title" icon="play_circle_outline" to="/showcase/layout/play-with-layout" replace label="Play with Layout" />
      <q-route-tab slot="title" icon="view_array" to="/showcase/layout/drawer-panels" replace label="Drawer Panels" />
      <q-route-tab slot="title" icon="pin_drop" to="/showcase/layout/fixed-positioning" replace label="Fixed Positioning" />
      <q-route-tab slot="title" icon="play_for_work" to="/showcase/layout/floating-action-button" replace label="Floating Action Button" />
    </q-tabs>

    <q-scroll-area slot="left" style="width: 100%; height: 100%">
      <q-list-header>Left Panel</q-list-header>
      <q-side-link item to="/showcase/layout/play-with-layout">
        <q-item-side icon="account circle" />
        <q-item-main label="Play with Layout" sublabel="Learn more about it" />
        <q-item-side right icon="thumb_up" />
      </q-side-link>
      <q-side-link item to="/showcase/layout/drawer-panels">
        <q-item-side icon="view_array" />
        <q-item-main label="Drawer Panels" sublabel="Layout left/right sides" />
      </q-side-link>
      <q-side-link item to="/showcase/layout/fixed-positioning">
        <q-item-side icon="pin_drop" />
        <q-item-main label="Fixed Positioning" sublabel="...on a Layout" />
      </q-side-link>
      <q-side-link item to="/showcase/layout/floating-action-button">
        <q-item-side icon="play_for_work" />
        <q-item-main label="Floating Action Button" sublabel="For Page actions" />
      </q-side-link>
    </q-scroll-area>

    <router-view />

    <q-toolbar slot="footer" class="glosy" inverted >
      <q-toolbar-title>
        Footer
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QTabs,
  QRouteTab,
  QBtn,
  QIcon,
  QItemSide,
  QItemMain,
  QSideLink,
  QListHeader,
  QScrollArea,
  QModal,
  QModalLayout
} from 'quasar'
import FormLogin from './FormLogin'
export default {
  components: {
    FormLogin,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea,
    QModal,
    QModalLayout
  },
  data () {
    return {
      layoutStore: {
        view: 'lHh Lpr lFf',
        reveal: false,
        leftScroll: true,
        rightScroll: true,
        leftBreakpoint: 996,
        rightBreakpoint: 1200,
        hideTabs: false
      },
      search: ''
    }
  },
  mounted () {
    this.$refs.layout.hideLeft()
  }
}
</script>
<style lang="stylus">
  .q-toolbar-inverted
    color: #027be3
    background: white
  .q-tabs-inverted
    color: #027be3
    background: white
</style>
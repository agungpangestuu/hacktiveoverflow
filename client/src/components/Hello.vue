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
        Hacktiv Overflow
        <span slot="subtitle">Empowering your app</span>
      </q-toolbar-title>
      <!-- <q-btn class="within-iframe-hide" flat @click="$router.replace('/showcase')" style="margin-right: 15px">
        <q-icon name="keyboard_arrow_left" />
        Go back
      </q-btn> -->
      <q-btn class="within-iframe-hide" flat @click="$refs.layoutModal.open()" style="margin-right: 15px" v-if="!isLogin">
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
      <q-btn class="within-iframe-hide" flat @click="logout" style="margin-right: 15px" v-if="isLogin">
        <q-icon name="account_circle" color="primary" />
        Logout
      </q-btn>
    </q-toolbar>

    <!-- <q-tabs slot="navigation" v-if="!layoutStore.hideTabs" inverted>
      <q-route-tab slot="title" icon="play_circle_outline" to="/showcase/layout/play-with-layout" replace label="Play with Layout" />
      <q-route-tab slot="title" icon="view_array" to="/showcase/layout/drawer-panels" replace label="Drawer Panels" />
      <q-route-tab slot="title" icon="pin_drop" to="/showcase/layout/fixed-positioning" replace label="Fixed Positioning" />
      <q-route-tab slot="title" icon="play_for_work" to="/showcase/layout/floating-action-button" replace label="Floating Action Button" />
    </q-tabs> -->

    <q-scroll-area slot="left" style="width: 100%; height: 100%">
      <q-list-header>Menu</q-list-header>
      <q-side-link item to="/question">
        <q-item-side icon="account circle" />
        <q-item-main label="Question" sublabel="Learn more about it" />
      </q-side-link>
      <q-side-link item to="/create-question" v-if="isLogin">
        <q-item-side icon="view_array" />
        <q-item-main label="Create Question" sublabel="create your question to audients" />
      </q-side-link>
      <q-side-link item to="/profile">
        <q-item-side icon="pin_drop" />
        <q-item-main label="profile" sublabel="...on a Layout" />
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
import { mapState, mapActions } from 'vuex'
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
  updated () {
    this.checkLogin()
  },
  computed: {
    ...mapState([
      'isLogin',
      'data'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'logout',
      'getAllQuestion'
    ])
  },
  watch: {
    isLogin: function () {
      this.checkLogin()
    }
  },
  mounted () {
    this.$refs.layout.hideLeft()
  },
  created () {
    this.getAllQuestion()
    this.checkLogin()
    if (!this.isLogin) {
      this.$router.push('/question')
    }
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

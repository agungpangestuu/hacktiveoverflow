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
      <q-btn class="within-iframe-hide" flat @click="$router.push('/signup')" style="margin-right: 15px" v-if="!isLogin">
        <q-icon name="account_circle" />
        Sigup
      </q-btn>
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
            <div class="layout-padding docs-input row justify-center">
              <div style="width: 500px; max-width: 90vw;">
                <big class="caption">Sign In</big>
                <q-field
                  icon="account_circle"
                  label="Account"
                  :error="error2"
                  helper="What's your account name?"
                  error-label="Hey, we got an error"
                >
                  <q-input v-model="login.username" type="email"/>
                </q-field>
                <q-field
                  icon="lock_outline"
                  label="Password"
                  :error="error2"
                  helper="Some helper"
                  error-label="Wait, wait. Error!"
                >
                  <q-input v-model="login.password" type="password"/>
                </q-field>
                  <q-btn color="primary" @click="showTextLoading()">
                    Sign In
                  </q-btn>
                <q-inner-loading :visible="visible">
                    <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
                </q-inner-loading>
              </div>
            </div>
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
      <q-side-link item to="/">
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
  QSpinnerGears,
  QModal,
  QModalLayout,
  QInnerLoading,
  QTransition,
  QInput,
  QToggle,
  QField,
  QTooltip,
  QPopover
} from 'quasar'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
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
    QSpinnerGears,
    QModal,
    QModalLayout,
    QInnerLoading,
    QTransition,
    QInput,
    QToggle,
    QField,
    QTooltip,
    QPopover
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
      search: '',
      error: true,
      error2: false,
      loading: true,
      visible: false,
      showSimulatedReturnData: false
    }
  },
  updated () {
    this.checkLogin()
  },
  computed: {
    ...mapState([
      'isLogin',
      'data',
      'login'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'logout',
      'getAllQuestion',
      'signIn'
    ]),
    simulateProgress (event, done) {
      // simulate a delay, like in
      // waiting for an Ajax call
      setTimeout(() => {
        // delay is over, now we call
        // done() function to inform button
        // it must go to its initial state
        done()
        // DON't forget to call done() otherwise
        // the button will keep on being in
        // "loading" state
      }, 3000)
    },
    getEmit (params) {
      console.log(params)
      if (params) {
        this.error2 = this.error
      }
    },
    showTextLoading () {
      this.show()
    },
    show () {
      this.visible = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.visible = false
        this.showSimulatedReturnData = true
        // console.log(this.data)
        this.signIn()
          .then(data => {
            localStorage.setItem('token', data.token)
            // this.getLogin()
            this.$refs.layoutModal.close()

            this.$router.push('/')
          })
          .catch(err => {
            this.$emit('err', true)
            console.log(err)
          })
      }, 3000)
    }
  },
  watch: {
    isLogin: function () {
      this.checkLogin()
    }
  },
  mounted () {
    console.log('test')
    this.$refs.layout.hideLeft()
  },
  created () {
    this.getAllQuestion()
    this.checkLogin()
    if (!this.isLogin) {
      this.$router.push('/')
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
  p.signup
    margin-top: 20px
</style>

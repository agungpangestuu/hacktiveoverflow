<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <big class="caption">Sign In</big>
      <!-- <q-toggle v-model="error2" color="negative" label="Toggle error state" /> -->
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


      <Loading @err="getEmit"></Loading>

    </div>
  </div>
</template>

<script>
import {
  QInput,
  QToggle,
  QIcon,
  QField,
  QTooltip,
  QPopover,
  QBtn
} from 'quasar'
import Loading from './Loading'
import { mapState } from 'vuex'
export default {
  components: {
    QInput,
    QToggle,
    QIcon,
    QField,
    QTooltip,
    QPopover,
    QBtn,
    Loading
  },
  data () {
    return {
      error: true,
      error2: false,
      loading: true
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
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
    }
  }
}
</script>
<style>
  .caption {
    text-align: center;
  }
</style>

<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <!-- <q-toggle v-model="error2" color="negative" label="Toggle error state" /> -->
      <big>Sign Up</big>
      <br><br>
      <q-field
        icon="description"
        :count="100"
        :error="error2"
        helper="What's your title postblog name?"
        error-label="Hey, we got an error"
      >
        <q-input v-model="userSignup.fullname" float-label="Fullname" />
      </q-field>

      <q-field
        icon="link"
        helper="input your link image only link image"
        :error="error2"
        error-label="We got an error"
      >
        <q-input v-model="userSignup.username" float-label="Username" />
      </q-field>
      <!-- <br> -->
      <q-field
        icon="link"
        helper="input your link image only link image"
        :error="error2"
        error-label="We got an error"
      >
        <q-input v-model="userSignup.password" float-label="Password" />
      </q-field>
      <q-field
        icon="link"
        helper="input your link image only link image"
        :error="error2"
        error-label="We got an error"
      >
        <q-input v-model="userSignup.email" float-label="Email" />
      </q-field>

      <q-btn @click="signBtn()">
        Sign Up
      </q-btn>
      <!-- <LoadingPost :data="{title, description, link}" @err="getEmit" @status="getEmit"></LoadingPost> -->


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
import { mapAction } from 'vuex'
export default {
  components: {
    QInput,
    QToggle,
    QIcon,
    QField,
    QTooltip,
    QPopover,
    QBtn
  },
  data () {
    return {
      userSignup: {
        fullname: '',
        email: '',
        password: '',
        username: ''
      },
      error: true,
      error2: false,
      loading: true
    }
  },
  methods: {
    ...mapAction([
      'SignUp'
    ]),
    signBtn () {
      this.SignUp(this.userSignup)
        .then(data => {
          this.userSigniup.fullname = ''
          this.userSigniup.email = ''
          this.userSigniup.password = ''
          this.userSigniup.username = ''
          // this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.error2 = this.error
        })
    }
  }
}
</script>
<style>
  q-btn {
    float: right;
  }
</style>

<template>
  <div class="layout-padding row justify-end">
    <div style="">

      <q-btn color="primary" @click="showTextLoading()">
        Sign In
      </q-btn>



          <q-inner-loading :visible="visible">
            <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
          </q-inner-loading>
    </div>
  </div>
</template>

<script>
import {
  QInnerLoading,
  QTransition,
  QBtn,
  QCard,
  QCardTitle,
  QCardMain,
  QSpinnerGears,
  LocalStorage
} from 'quasar'
import { mapState, mapActions } from 'vuex'
// Don't forget to also load animations
// import 'quasar-extras/animate/fadeIn.css'
// import 'quasar-extras/animate/fadeOut.css'
export default {
  components: {
    QInnerLoading,
    QTransition,
    QBtn,
    QCard,
    QCardTitle,
    QCardMain,
    QSpinnerGears
  },
  props: ['data'],
  data () {
    return {
      visible: false,
      showSimulatedReturnData: false
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    ...mapActions([
      'getLogin'
    ]),
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
        this.$http.post('/api/user/signin', this.data)
          .then(({data}) => {
            console.log(data)
            LocalStorage.set('token', data.token)
            this.getLogin()
            this.$router.replace('/')
            if (LocalStorage.has('token')) {
              this.$emit('status', true)
            }
            else {
              this.$emit('status', false)
            }
          })
          .catch(err => {
            this.$emit('err', true)
            console.log(err)
          })
      }, 3000)
    }
  }
}
</script>

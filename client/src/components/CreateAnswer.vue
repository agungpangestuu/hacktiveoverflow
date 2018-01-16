<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Your Answer</p>
      <div class="stacked-label">
        <textarea class="full-width" style="margin: 0px; width: 372px; height: 174px;" v-model="answer"></textarea>
      </div>

      <q-btn @click="createBtn()">
        create
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
import { mapState, mapActions } from 'vuex'
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
      error: true,
      error2: false,
      loading: true,
      answer: ''
    }
  },
  computed: {
    ...mapState([
      'formCreate'
    ])
  },
  methods: {
    ...mapActions([
      'SignUp',
      'clearSign',
      'postAnswer'
    ]),
    createBtn () {
      let data = {
        question: this.$route.params.id,
        answer_content: this.answer
      }
      this.postAnswer(data)
        .then(data => {
          console.log(data)
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style>
  q-btn {
    float: right;
  }
</style>

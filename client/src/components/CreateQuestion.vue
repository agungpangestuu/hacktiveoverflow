<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-field
        icon="description"
        :count="100"
        :error="error2"
        helper="What's your title postblog name?"
        error-label="Hey, we got an error"
      >
        <q-input v-model="formCreate.title" float-label="question title" />
      </q-field>

      <q-field
        icon="link"
        helper="input your link image only link image"
        :error="error2"
        error-label="We got an error"
      >
        <q-input v-model="formCreate.question_content" float-label="Question" />
      </q-field>
      <!-- <br> -->

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
      loading: true
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
      'askCreate'
    ]),
    createBtn () {
      this.askCreate()
        .then(() => {
          this.$router.push('/')
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

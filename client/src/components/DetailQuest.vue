<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-card>
        <q-card-title>
          <div class="row">
            <div class="col-6">
              {{data_Question.title}}
            </div>
              <div class="col-6">
                <q-item-side right icon="thumb_up" v-if="data_Question.vote.includes(dataUser.id) === false" @click="vote">
                  <q-item-tile stamp>{{data_Question.vote.length}} like</q-item-tile>
                </q-item-side>
                <q-item-side right icon="thumb_up" color="blue" v-if="data_Question.vote.includes(this.dataUser.id)> 0" @click="vote">
                  <q-item-tile stamp>{{data_Question.vote.length}} like</q-item-tile>
                  <!-- <q-item-tile stamp v-else-if="data_Question.vote.length > 0">{{data_Question.vote.length}} like</q-item-tile> -->
                </q-item-side>
            </div>
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div class="container">
            <div class="row">
              <div class="col-12">
                {{data_Question.question_content}}
              </div>
            </div>
          </div>

        </q-card-main>
        <q-card-actions>
          <div v-if="dataUser.id">

          <q-btn flat @click="$refs.updateQuest.open()" v-if="dataUser.id === data_Question.author._id">Update</q-btn>
          <q-modal ref="updateQuest" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
            <q-modal-layout>
              <q-toolbar slot="header">
                <q-btn flat @click="$refs.updateQuest.close()">
                  <q-icon name="keyboard_arrow_left" />
                </q-btn>
                <div class="q-toolbar-title">
                  Header
                </div>
              </q-toolbar>
              <div class="layout-padding">
                <q-field
                  :error="error2"
                  helper="What's your title Question?"
                  error-label="Hey, we got an error"
                >
                  <q-input v-model="data_Question.title" type="text"/>
                </q-field>

                <q-field
                  :error="error2"
                  helper="Some helper"
                  error-label="Wait, wait. Error!"
                >
                <textarea v-model="data_Question.question_content" rows="8" cols="100"></textarea>
                </q-field>
                <q-btn @click="update" >Update</q-btn>
              </div>
            </q-modal-layout>
          </q-modal>
          <q-btn flat @click="remove" v-if="dataUser.id === data_Question.author._id">Delete</q-btn>
        </div>
        </q-card-actions>
      </q-card>
      <br>
      <div>{{data_Answer.length}} ANSWER</div>
      <hr>
        <answer-quest></answer-quest>
      <router-view></router-view>
      <q-card>
        <create-answer></create-answer>
      </q-card>
    </div>

  </div>
</template>

<script>
import {
  QCheckbox,
  QOptionGroup,
  QChip,
  QField,
  QCard,
  QCardTitle,
  QCardMain,
  QCardSeparator,
  QCardActions,
  QBtn,
  QModal,
  QModalLayout,
  QItemMain,
  QItemSide,
  QItem,
  QItemTile,
  QToolbar,
  QInput,
  QIcon
} from 'quasar'
import { mapActions, mapState } from 'vuex'
import CreateAnswer from './CreateAnswer'
import AnswerQuest from './AnswerQuest'
export default {
  components: {
    QCheckbox,
    QOptionGroup,
    QChip,
    QField,
    QCard,
    QCardTitle,
    QCardMain,
    QCardSeparator,
    CreateAnswer,
    AnswerQuest,
    QCardActions,
    QBtn,
    QModal,
    QItemMain,
    QItemSide,
    QItem,
    QItemTile,
    QModalLayout,
    QToolbar,
    QInput,
    QIcon
  },
  data () {
    return {
      answer: [],
      error: true,
      error2: false,
      loading: true,
      statusVote: false,
      statusLogin: false
    }
  },
  computed: {
    ...mapState([
      'dataUser',
      'data_Answer',
      'data_Question'
    ]),
    computedClasses () {
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    }

  },
  updated () {
    this.$nextTick(function () {
      this.loginState()
    })
  },
  watch: {
    isLogin: function (newLogin) {
      this.statusLogin = newLogin
    }
  },
  methods: {
    ...mapActions([
      'getQuestById',
      'getAnswerByQuestion',
      'removeQuest',
      'updateQuest',
      'decode',
      'voteQuest',
      'checkLogin'
    ]),
    remove () {
      this.removeQuest(this.$route.params.id)
      this.$router.push('/')
    },
    update () {
      this.updateQuest(this.data_Question)
        .then(data => {
          this.data_Answer.push(data)
          this.data = data
          this.$refs.updateQuest.close()
        })
        .catch(() => {
          alert('You Must Login')
        })
    },
    vote () {
      this.voteQuest(this.data_Question._id)
    },
    loginState () {
      this.checkLogin()
    }
  },
  created () {
    this.checkLogin()
    this.statusLogin = this.isLogin
    let id = this.$route.params.id
    this.getQuestById(id)
    this.getAnswerByQuestion(id)
      .then(data => {
        this.answer = data
      })
    if (localStorage.getItem('token')) {
      this.decode()
    }
  }
}
</script>

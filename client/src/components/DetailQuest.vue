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
              <q-item-side right icon="thumb_up"></q-item-side>
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
          <q-btn flat @click="$refs.updateQuest.open()">Update</q-btn>
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
                <q-btn @click="update">Update</q-btn>
              </div>
            </q-modal-layout>
          </q-modal>
          <q-btn flat @click="remove">Delete</q-btn>
        </q-card-actions>
      </q-card>
      <br>
       {{answer.length}} ANSWER
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
  QToolbar,
  QInput,
  QIcon
} from 'quasar'
import { mapActions } from 'vuex'
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
    QModalLayout,
    QToolbar,
    QInput,
    QIcon
  },
  data () {
    return {
      data_Question: [],
      data_Answer: [],
      answer: [],
      error: true,
      error2: false,
      loading: true
    }
  },
  computed: {
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
    },
    answer () {
      let id = this.$route.params.id
      this.getAnswerByQuestion(id)
        .then(data => {
          this.answer = data
        })
    }
  },
  methods: {
    ...mapActions([
      'getQuestById',
      'getAnswerByQuestion',
      'removeQuest',
      'updateQuest'
    ]),
    remove () {
      this.removeQuest(this.$route.params.id)
      this.$router.push('/')
    },
    update () {
      this.updateQuest(this.data_Question)
        .then(data => {
          this.data = data
        })
    }
  },
  created () {
    let id = this.$route.params.id
    this.getQuestById(id)
      .then(data => {
        this.data_Question = data
        console.log('ini data cuk', this.data_Question)
      })
    this.getAnswerByQuestion(id)
      .then(data => {
        this.answer = data
      })
  }
}
</script>

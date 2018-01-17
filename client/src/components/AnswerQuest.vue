<template>
  <div class="layout-padding row justify-center">
    <div v-for="an in data_Answer">
    <div style="width: 500px; max-width: 90vw;">
        <q-card>
          <q-card-title>
            <div class="row">
              <div class="col-6">
                {{an.by.username}}
              </div>
              <div class="col-6">
                <q-item-side v-if="an.vote.includes(dataUser.id) === false" right icon="thumb_up" @click="like(an._id)">
                  <q-item-tile stamp>{{an.vote.length}} like</q-item-tile>
                </q-item-side>
                <q-item-side v-if="an.vote.includes(dataUser.id)" right icon="thumb_up" color="blue" @click="like(an._id)">
                  <q-item-tile stamp>{{an.vote.length}} like</q-item-tile>
                </q-item-side>
              </div>
            </div>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="container">
              <div class="row">
                <div class="col-6">
                  {{an.answer_content}}
                </div>
                <div class="col-6">

                <q-item-side right v-if="an.by._id == dataUser.id" icon="delete" color="red" @click="remove(an._id)"></q-item-side>
                
              </div>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
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
  QItemSide,
  QItemTile
} from 'quasar'
import { mapActions, mapState } from 'vuex'
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
    QItemSide,
    QItemTile
  },
  data () {
    return {
      answers: [],
      vote: false
    }
  },
  computed: {
    ...mapState([
      'data_Answer',
      'dataUser'
    ])
    // answers () {
    //   let id = this.$route.params.id
    //   this.getAnswerByQuestion(id)
    //     .then(data => {
    //       this.answers = data
    //       console.log('ini data', this.answer)
    //     })
    // }
  },
  methods: {
    ...mapActions([
      'getQuestById',
      'getAnswerByQuestion',
      'removeAnswer',
      'voteAnswer'
    ]),
    like (id) {
      if (this.vote) {
        this.vote = false
      }
      else {
        this.vote = true
      }
      this.voteAnswer(id)
    },
    remove (id) {
      let index = 0
      this.data_Answer.forEach((data, i) => {
        if (data._id === id) {
          index = i
        }
      })
      this.data_Answer.splice(index, 1)
      this.removeAnswer(id)
    }
  },
  created () {
    let id = this.$route.params.id
    this.getAnswerByQuestion(id)
      .then(() => {
        // this.answers = data
        console.log('sukses')
      })
  },
  mounted () {
    let id = this.$route.params.id
    this.getAnswerByQuestion(id)
      .then(data => {
        // this.answers = data
        // console.log('ini data', data)
      })
  }
}
</script>

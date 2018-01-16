<template>
  <div class="layout-padding row justify-center">
    <div v-for="an in answers">
    <div style="width: 500px; max-width: 90vw;">
        <q-card>
          <q-card-title>
            <div class="row">
              <div class="col-6">
                {{an.by.username}}
              </div>
              <div class="col-6" v-if="">

                <q-item-side right icon="delete" color="red" @click="remove(an._id)"></q-item-side>

              </div>
            </div>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="container">
              <div class="row">
                <div class="col-12">
                  {{an.answer_content}}
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
  QItemSide
} from 'quasar'
import { mapActions } from 'vuex'
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
    QItemSide
  },
  data () {
    return {
      answers: []
    }
  },
  computed: {
    answers () {
      let id = this.$route.params.id
      this.getAnswerByQuestion(id)
        .then(data => {
          this.answers = data
          console.log('ini data', this.answer)
        })
    }
  },
  methods: {
    ...mapActions([
      'getQuestById',
      'getAnswerByQuestion',
      'removeAnswer'
    ]),
    remove (id) {
      let index = 0
      this.answers.forEach((data, i) => {
        if (data._id === id) {
          index = i
        }
      })
      this.answers.splice(index, 1)
      this.removeAnswer(id)
    }
  },
  created () {
    let id = this.$route.params.id
    this.getAnswerByQuestion(id)
      .then(data => {
        this.answers = data
        console.log('ini data', this.answers)
      })
  }
}
</script>

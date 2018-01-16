<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <div v-for="d in data" :key="d._id">
        <q-list inset-separator>
          <q-item>
            <q-item-side>
              <q-chip square color="primary" class="shadow-2">10k</q-chip>
              <q-item-tile stamp>answer</q-item-tile>
            </q-item-side>
            <q-item-main>
              <router-link :to="{ name: 'DetailQuest', params: {id: d._id} }">{{d.title}}</router-link>
              <q-item-tile stamp>{{d.question_content}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile stamp>10 min ago</q-item-tile>
              <span class="text-amber">
                <q-item-tile icon="star" v-for="n in 5" :key="n" />
              </span>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>
<script>
import {
  QList,
  QListHeader,
  QItem,
  QItemSeparator,
  QItemSide,
  QItemMain,
  QItemTile,
  QChip,
  QPopover
} from 'quasar'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    QList,
    QListHeader,
    QItem,
    QItemSeparator,
    QItemSide,
    QItemMain,
    QItemTile,
    QChip,
    QPopover
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'data'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQuestion',
      'getAnswerByQuestion'
    ])
  },
  created () {
    this.getAllQuestion()
    // this.getAnswerByQuestion()
    //   .then(data => console.log('datas'))
  }
}
</script>

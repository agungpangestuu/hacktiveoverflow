import Vue from 'vue'
import VueRouter from 'vue-router'

// import Hello from '@/Hello.vue'

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/',
      component: load('Hello'),
      children: [
        {
          path: '/question',
          component: load('Quetion')
        },
        {
          path: '/detail-quest/:id',
          name: 'DetailQuest',
          component: load('DetailQuest')
        },
        {
          path: '/create-question',
          name: 'Create',
          component: load('CreateQuestion')
        },
        {
          path: '/signup',
          component: load('FormSignup')
        }
      ]
    }
  ]
})

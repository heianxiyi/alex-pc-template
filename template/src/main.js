import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import server from './http'
import VueParticles from 'vue-particles'

/** ui-framework — Start **/
import 'ant-design-vue/dist/antd.css'
import ant from 'ant-design-vue'
/** ui-framework — End **/

Vue.config.productionTip = false

if (process.env.NODE_ENV !== "production") require('./mock/index.js')

Vue.prototype.$http = server;

Vue.use(ant)
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

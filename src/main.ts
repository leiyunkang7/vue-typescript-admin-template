import Vue from 'vue'
import 'normalize.css'
import VueCompositionApi from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'
import ElementUI from 'element-ui'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  // size: store.state.app, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(hooks)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

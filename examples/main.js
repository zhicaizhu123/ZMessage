import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/packages/theme-chalk/lib/index.css'
import ZMessage from '../packages'

Vue.config.productionTip = false

Vue.use(ElementUi)

ZMessage.setConfig({ max: 2, isQueue: true, showNewest: false })

Vue.prototype.$message = ZMessage

new Vue({
  render: h => h(App)
}).$mount('#app')

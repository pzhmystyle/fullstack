import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// import Swiper,{Pagination,Navigation} from 'swiper'
// Swiper.use([Pagination,Navigation])
// import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

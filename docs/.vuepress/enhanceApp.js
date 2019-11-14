import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(Buefy)
  Vue.use(VueAxios, axios)
}
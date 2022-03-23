import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { createProvider } from './vue-apollo'
import './config'
import './directives'
import './utils'

// Import styles
import './styles/global.scss'

// Import dependencies
import VueAspectRatio from 'vue-aspect-ratio'
import TextareaAutosize from 'vue-textarea-autosize'
import vMediaQuery from 'v-media-query'
import VTooltip from 'v-tooltip'
import VueLazyload from 'vue-lazyload'
import NProgress from 'vue-nprogress'

// Register dependencies
Vue.component('vue-aspect-ratio', VueAspectRatio)
Vue.use(TextareaAutosize)
Vue.use(vMediaQuery)
Vue.use(VTooltip)
Vue.use(VueLazyload, { observer: true, observerOptions: { rootMargin: '0px', threshold: 0 } })
Vue.use(NProgress, { latencyThreshold: 0, router: false, http: false })

const nprogress = new NProgress()

nprogress.configure({ parent: '#progressBar', minimum: 0.01, trickleRate: 0.2, trickleSpeed: 100 })

// Vue.config
Vue.config.productionTip = false

// Build Vue instance
new Vue({
	router,
	store,
	i18n,
	nprogress,
	apolloProvider: createProvider(),
	render: h => h(App)
}).$mount('#app')

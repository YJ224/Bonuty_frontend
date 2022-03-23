import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// Import modules
import chat from './modules/chat'
import modals from './modules/modals'
import user from './modules/user'

// Vue.use
Vue.use(Vuex)

// Persist Data
const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: (state) => ({
		chat: {
			open: state.chat.open
		}
	})
})

// Build Vuex store
export default new Vuex.Store({

	// Global State
	state: {
		regionBlocked: false,
		mobileMenu: false
	},

	// Global Mutations
	mutations: {
		// mobileMenu:open
		// --------------------------------------------------
		'mobileMenu:open' (state) {
			state.mobileMenu = true
		},

		// mobileMenu:close
		// --------------------------------------------------
		'mobileMenu:close' (state) {
			state.mobileMenu = false
		}
	},

	// Modules
	modules: {
		chat,
		modals,
		user
	},

	// Plugins
	plugins: [vuexLocal.plugin]
})

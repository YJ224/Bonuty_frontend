import router from '@/router'

export default {

	// modals:open
	// --------------------------------------------------
	'modals:open' (state, modal) {
		state.open = modal
	},


	// modals:close
	// --------------------------------------------------
	'modals:close' (state) {
		state.open = undefined
		router.push({ params: { id: null }, query: {} })
	}
}

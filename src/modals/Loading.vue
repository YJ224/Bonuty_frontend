<template>
	<Skeleton width="100%" :height="`${modal.height}px`" />
</template>





<script>
// Import uikit
import Skeleton from '@/uikit/Skeleton'

// Import modals
import modals from './modals'

export default {
	name: 'ModalLoading',

	// Components
	// --------------------------------------------------
	components: {
		Skeleton
	},

	// Computed
	// --------------------------------------------------
	computed: {
		modal() {
			return modals.find(e => e.id === this.$store.state.modals.open)
		}
	}
}
</script>

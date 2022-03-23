<template>
	<div id="modals" @click.self.prevent="$store.commit('modals:close')">
		<div ref="modal" class="modal" :style="{ maxWidth: `${modal.width}px` }">
			<!-- Close -->
			<div class="close" @click="$store.commit('modals:close')">
				<CloseIcon :size="18" />
			</div>

			<!-- Modal -->
			<component :is="modal.component" />
		</div>
	</div>
</template>





<script>
// Import modals
import modals from './modals'

// Import icons
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default {
	name: 'Modals',

	// Components
	// --------------------------------------------------
	components: {
		CloseIcon
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





<style src="./modal.scss" lang="scss"></style>
<style src="./styles.scss" lang="scss" scoped></style>

<template>
	<button
		:class="`${color}${fontSize ? ` fs-${fontSize}` : ''}${iconOnly ? ' icon-only' : ''}`"
		@click="$emit('click')"
		:style="{ width: width ? '100%' : '', maxWidth: width, height, padding }"
		:disabled="disabled || loading"
	>
		<Loader v-if="loading" />
		<span :style="{ opacity: loading ? 0 : '' }">
			<slot />
		</span>
	</button>
</template>





<script>
// Import uikit
import Loader from '@/uikit/Loader'

export default {
	name: 'Button',

	// Props
	// --------------------------------------------------
	props: {
		color: String,
		width: String,
		height: String,
		loading: [Boolean, String, Number, Function],
		disabled: [Boolean, String, Number, Function],
		padding: String,
		fontSize: String,
		iconOnly: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		Loader
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

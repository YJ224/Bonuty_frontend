<template>
	<div class="input">
		<div class="icon" v-if="icon">
			<SearchIcon :size="20" v-if="icon === 'search'" />
		</div>
		<input
			:type="type"
			:value="value"
			@input="$emit('input', $event.target.value)"
			:placeholder="placeholder"
			:style="{ maxWidth, height, paddingLeft: icon ? '40px' : '' }"
			:min="min"
		/>
	</div>
</template>





<script>
// Import icons
import SearchIcon from 'vue-material-design-icons/Magnify.vue'

export default {
	name: 'Input',

	// Props
	// --------------------------------------------------
	props: {
		type: String,
		value: [String, Number],
		maxWidth: String,
		height: String,
		placeholder: [String, Function],
		min: [String, Number],
		icon: String
	},

	// Components
	// --------------------------------------------------
	components: {
		SearchIcon
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

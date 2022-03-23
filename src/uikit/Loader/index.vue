<template>
	<div class="loader" :class="className" :style="{ width: size, height: size }">
		<svg class="circular" viewBox="25 25 50 50">
			<circle class="path" :style="{ stroke: color }" cx="50" cy="50" r="20" fill="none" stroke-width="3.6" stroke-miterlimit="10" />
		</svg>
	</div>
</template>





<script>
export default {
	name: 'Loader',

	// Props
	// --------------------------------------------------
	props: {
		size: String,
		color: String,
		className: String
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

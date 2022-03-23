<template>
	<div class="skeleton" :class="color" :style="{ width, height, borderRadius }" />
</template>





<script>
export default {
	name: 'Skeleton',

	// Props
	// --------------------------------------------------
	props: {
		color: String,
		width: String,
		height: String,
		borderRadius: String
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

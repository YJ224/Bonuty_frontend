<template>
	<img
		class="avatar"
		v-lazy="src"
		:style="{ width: size, height: size }"
		alt=""
	/>
</template>





<script>
export default {
	name: 'Avatar',

	// Props
	// --------------------------------------------------
	props: {
		src: String,
		size: String
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

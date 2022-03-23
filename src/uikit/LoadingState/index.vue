<script>
// NProgress timeout
let nprogressTimeout = null

export default {
	name: 'LoadingState',

	// Created
	// --------------------------------------------------
	created() {
		nprogressTimeout = setTimeout(() => {
			this.$nprogress.start()
		}, 0)
	},

	// Before Destroy
	// --------------------------------------------------
	beforeDestroy() {
		clearTimeout(nprogressTimeout)
		this.$nprogress.done()
	}
}
</script>

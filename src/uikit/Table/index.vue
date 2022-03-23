<template>
	<div class="table">

		<!-- Header -->
		<div class="header">
			<div class="row">
				<div class="td" v-for="(field, i) in fields" :key="i" :style="{ width: field.width }">
					<span>{{ field.name }}</span>
				</div>
			</div>
		</div>

		<!-- Body -->
		<div class="body" :style="{ minHeight: `${tableBodyMinHeight}px` }">

			<!-- Loading -->
			<template v-if="loading">
				<div class="row" v-for="i in perPage" :key="i">
					<div class="td" v-for="(field, i) in fields" :key="i" :style="{ width: field.width }">
						<Skeleton width="100%" height="16px" />
					</div>
				</div>
			</template>

			<!-- Data -->
			<template v-else>
				<div class="row g-fade-in" v-for="(item, i) in data.slice(perPage * (currentPage - 1), (perPage * (currentPage - 1)) + perPage)" :key="i">
					<div class="td" v-for="(key, i2) in Object.keys(item)" :key="i2" :class="fields[i2].color" :style="{ width: fields[i2].width }">
						<span>{{ item[key] }}</span>
					</div>
				</div>
			</template>

		</div>

		<!-- Footer -->
		<div class="footer" v-if="data.length > perPage"></div>

	</div>
</template>





<script>
// Import uikit
import Skeleton from '@/uikit/Skeleton'

export default {
	name: 'Table',

	// Props
	// --------------------------------------------------
	props: {
		loading: [Boolean, String, Number, Function],
		fields: Array,
		data: Array
	},

	// Components
	// --------------------------------------------------
	components: {
		Skeleton
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			currentPage: 1,
			perPage: 14
		}
	},

	// Computed
	// --------------------------------------------------
	computed: {
		tableBodyMinHeight() {
			return 44 * this.perPage
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

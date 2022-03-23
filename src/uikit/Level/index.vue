<template>
	<div
		class="level"
		:class="getRank()"
		v-tooltip="$t(`site.levelRanks.${getRank()}`)"
	>
		<span>{{ lvl }}</span>
	</div>
</template>





<script>
export default {
	name: 'Level',

	// Props
	// --------------------------------------------------
	props: {
		lvl: [Number, String]
	},

	// Methods
	// --------------------------------------------------
	methods: {
		getRank() {
			const lvl = Number(this.lvl)

			if (0 <= lvl && lvl <= 100) return 'unranked'
			else if (100 <= lvl && lvl < 200) return 'rust'
			else if (200 <= lvl && lvl < 300) return 'bronze'
			else if (300 <= lvl && lvl < 400) return 'silver'
			else if (400 <= lvl && lvl < 500) return 'platinum'
			else if (500 <= lvl && lvl < 600) return 'sapphire'
			else if (600 <= lvl && lvl < 700) return 'gold'
			else if (700 <= lvl && lvl < 800) return 'emerald'
			else if (800 <= lvl && lvl < 900) return 'ruby'
			else if (900 <= lvl && lvl < 1000) return 'diamond'
			else if (1000 <= lvl) return 'antimatter'
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

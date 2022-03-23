<template>
	<div class="normal-page">

		<!-- History -->
		<div class="history" :class="{ 'chat-open': $store.state.chat.open }">
			<HistoryCard v-for="i in 20" :key="i" :loading="loading" />
		</div>

		<!-- Header -->
		<div class="header">

			<div class="left">
				<!-- Pending Winnings -->
				<Button color="secondary" :disabled="!pendingWinnings.length" :loading="loading">{{ $tc('pages.raffles.pendingWinnings', pendingWinnings.length) }}</Button>

				<!-- Active Raffles -->
				<template v-if="$mq.resize && $mq.above($breakpoint.sm + 1)">
					<div class="line" />
					<Skeleton width="100px" height="20px" v-if="loading" />
					{{ loading ? '' : $tc('pages.raffles.activeRaffles', raffles.length) }}
				</template>
			</div>

			<div class="right">
				<!-- Filters -->
				<Select v-model="filters.price.selected" :items="filters.price.items" :label="$t('others.price')" :disabled="loading" height="46px" />
				<Select v-model="filters.sort.selected" :items="filters.sort.items" :label="$t('others.sort')" :disabled="loading" height="46px" />

				<!-- Create Raffle -->
				<Button color="primary" @click="$router.push('?modal=create-raffle')" :disabled="loading">{{ $t('pages.raffles.createBtn') }}</Button>
			</div>

		</div>

		<!-- Separator -->
		<div class="separator" />

		<!-- Raffles -->
		<transition-group class="raffles" name="raffle" tag="div" @before-leave="beforeLeaveAnim">
			<Raffle v-for="i in (loading ? 20 : 20)" :key="i" :loading="loading" />
		</transition-group>
	</div>
</template>





<script>
// Import components
import HistoryCard from './HistoryCard'
import Raffle from './Raffle'

// Import uikit
import Button from '@/uikit/Button'
import Select from '@/uikit/Select'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import AscendingIcon from 'vue-material-design-icons/SortReverseVariant.vue'
import DescendingIcon from 'vue-material-design-icons/SortVariant.vue'
import PlayersIcon from 'vue-material-design-icons/AccountGroup.vue'

export default {
	name: 'Raffles',

	// Components
	// --------------------------------------------------
	components: {
		HistoryCard,
		Raffle,
		Button,
		Select,
		Skeleton
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: true,
			raffles: [],
			pendingWinnings: [],
			filters: {
				sort: {
					selected: {
						id: 'descending',
						name: this.$t('others.descending'),
						icon: DescendingIcon
					},
					items: [
						{
							id: 'descending',
							name: this.$t('others.descending'),
							icon: DescendingIcon
						},
						{
							id: 'ascending',
							name: this.$t('others.ascending'),
							icon: AscendingIcon
						},
						{
							id: 'players',
							name: this.$t('others.players'),
							icon: PlayersIcon
						}
					]
				},
				price: {
					selected: {
						id: 0,
						name: this.$t('others.allPrices')
					},
					items: [
						{
							id: 0,
							name: this.$t('others.allPrices')
						},
						{
							id: 1,
							name: '0.00 - 9.99'
						},
						{
							id: 2,
							name: '10.00 - 24.99'
						},
						{
							id: 3,
							name: '25.00 - 49.99'
						},
						{
							id: 4,
							name: '50.00 - 149.99'
						},
						{
							id: 5,
							name: '150.00 - 299.99'
						},
						{
							id: 6,
							name: '300.00 - 499.99'
						},
						{
							id: 7,
							name: '500.00 - 999.99'
						},
						{
							id: 8,
							name: '1000.00+'
						}
					]
				}
			}
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * beforeLeaveAnim()
		 * - fixes element going to top-left when leaving
		 */
		beforeLeaveAnim(el) {
			const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)
			el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
			el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
			el.style.width = width
			el.style.height = height
		}
	},

	mounted() {
		setTimeout(() => {
			this.loading = false
		}, 400)
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

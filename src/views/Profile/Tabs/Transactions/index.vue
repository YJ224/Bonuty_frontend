<template>
	<div class="normal-page">
		<div class="transactions">

			<!-- Title -->
			<div class="title">{{ $t('pages.profile.tabs.transactions.name') }}</div>

			<!-- Categories -->
			<div class="categories">
				<router-link
					:to="`/profile/transactions/${category.id}`"
					v-for="category in categories"
					:key="category.id"
					:class="{ active: $route.params.category === category.id }"
					v-if="category.enabled || !category.isGame"
				>
					<div class="content">
						<component :is="category.icon" :class="`${category.id}-icon`" />
						{{ $t(category.i18nKey) }}
					</div>
				</router-link>
			</div>

			<!-- Table -->
			<Table
				:fields="fields.deposits"
				:data="data[$route.params.category]"
				:loading="loading"
			/>

		</div>
	</div>
</template>

<script>
// Import uikit
import Table from '@/uikit/Table'

// Import icons
import DepositIcon from '@/assets/icons/deposit.svg'
import WithdrawIcon from '@/assets/icons/withdraw.svg'
import TipsIcon from '@/assets/icons/tips.svg'

// Import games
import { games } from '@/config'

let gamesData = {}
for (let i in games) {
	const game = games[i]

	gamesData[game.id] = []
}

export default {
	name: 'Transactions',

	// Components
	// --------------------------------------------------
	components: {
		Table
  },

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: true,
			categories: [
				{
					id: 'deposits',
					i18nKey: 'others.deposits',
					icon: DepositIcon
				},
				{
					id: 'withdrawals',
					i18nKey: 'others.withdrawals',
					icon: WithdrawIcon
				},
				{
					id: 'tips',
					i18nKey: 'others.tips',
					icon: TipsIcon
				},
				...this.$games
			],
			fields: {
				deposits: [
					{
						name: this.$t('others.id'),
						width: '50%',
						color: 'text-color-2'
					},
					{
						name: this.$t('others.method')
					},
					{
						name: this.$t('others.amount')
					},
					{
						name: this.$t('others.status')
					},
					{
						name: this.$t('others.transactionID'),
						width: '300%',
						color: 'text-color-2'
					},
					{
						name: this.$t('others.date'),
						width: '85%',
						color: 'text-color-2'
					}
				]
			},
			data: {
				deposits: [
					{
						id: 1421,
						method: 'Bitcoin',
						amount: this.$formatBalance(5112),
						status: 3,
						transactionID: '0xbdafb4f381797916ba3aafc74946a31fe70e7b9f4f05086d8ec8d16caa10c9b9',
						date: 1617921999
					},
					{
						id: 1521,
						method: 'Bitcoin',
						amount: this.$formatBalance(5112),
						status: 3,
						transactionID: '0xbdafb4f381797916ba3aafc74946a31fe70e7b9f4f05086d8ec8d16caa10c9b9',
						date: 1617921999
					},
					{
						id: 1121,
						method: 'Bitcoin',
						amount: this.$formatBalance(5112),
						status: 3,
						transactionID: '0xbdafb4f381797916ba3aafc74946a31fe70e7b9f4f05086d8ec8d16caa10c9b9',
						date: 1617921999
					}
				],
				withdrawals: [],
				tips: [],
				...gamesData
			}
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		$route() {
			this.loading = true

			setTimeout(() => {
				this.loading = false
			}, 400)
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		// Select first category if none is selected or selected doesn't exist
		if (!this.$route.params.category || !this.categories.filter(e => e.id === this.$route.params.category).length) {
			this.$router.push(`/profile/transactions/${this.categories[0].id}`)
		}

		// Select first tab if game is disabled
		if (this.categories.find(e => e.id === this.$route.params.category).isGame && !this.$games.find(e => e.id === this.$route.params.category)?.enabled) {
			this.$router.push(`/profile/transactions/${this.categories[0].id}`)
		}

		setTimeout(() => {
			this.loading = false
		}, 400)
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

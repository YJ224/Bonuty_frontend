<template>
	<div class="normal-page">

		<!-- User Side -->
		<div class="user-side">
			<div class="user">
				<div class="content">
					<!-- Avatar -->
					<div class="user-avatar">
						<div class="bg"></div>
						<Avatar :src="$store.state.user.avatar" size="65px" />
					</div>

					<!-- Username -->
					<div class="username">
						<span>{{ $store.state.user.username }}</span>
					</div>

					<!-- Member Since -->
					<div class="member-since">{{ $t('others.memberSince', { date: '2/4/2018' }) }}</div>
				</div>
				<Button color="red" width="100%">{{ $t('pages.profile.logout') }}</Button>
			</div>
		</div>

		<!-- Page Side -->
		<div class="page-side">

			<!-- Games -->
			<section class="games">
				<div class="grid">
					<div class="game" v-for="game in $games" :key="game.id" v-if="game.enabled">
						<Skeleton width="100%" height="137px" v-if="loading" />
						<div class="content g-fade-in" v-else>
							<div class="name">
								<component :is="game.icon" :class="`${game.id}-icon`" />
								{{ $t(game.i18nKey) }}
							</div>
							<div class="stats">

								<template v-if="game.id === 'roulette' || game.id === 'blackjack'">
									<div class="stat">
										<div class="value">402</div>
										<div class="label">{{ $t('others.bets') }}</div>
									</div>
									<div class="divisor" />
								</template>

								<template v-if="game.id === 'raffles'">
									<div class="stat">
										<div class="value">152</div>
										<div class="label">{{ $t('others.bets') }}</div>
									</div>
									<div class="divisor" />
								</template>

								<div class="stat">
									<div class="value">
										<CoinsIcon />
										{{ $formatBalance(522154) }}
									</div>
									<div class="label">{{ $t('others.wagered') }}</div>
								</div>
								<div class="divisor" />
								<div class="stat">
									<div class="value won">
										<CoinsIcon />
										{{ $formatBalance(12424) }}
									</div>
									<div class="label">{{ $t('others.profit') }}</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- Other Stats -->
			<section class="other-stats" v-for="category in categories" :key="category.id">
				<div class="title">{{ $t(category.i18nKey) }}</div>
				<div class="grid">
					<div class="stat" v-for="stat in category.stats" :key="stat.id">
						<Skeleton width="100%" height="100%" v-if="loading" />
						<template v-else>
							<div class="icon g-fade-in">
								<component :is="stat.icon" :size="60" />
							</div>
							<div class="content g-fade-in">
								<div class="value">
									<CoinsIcon v-if="!stat.isNotCoins" />
									{{ !stat.isNotCoins ? $formatBalance(1255) : 302 }}
								</div>
								<div class="label">{{ $t(`pages.profile.tabs.dashboard.stats.${category.id}.${stat.id}`) }}</div>
							</div>
						</template>
					</div>
				</div>
			</section>

		</div>

	</div>
</template>





<script>
// Import uikit
import Avatar from '@/uikit/Avatar'
import Button from '@/uikit/Button'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import CoinsIcon from '@/assets/icons/coins.svg'
import TotalDepositedIcon from 'vue-material-design-icons/TrayPlus.vue'
import TotalWithdrawnIcon from 'vue-material-design-icons/TrayMinus.vue'
import TotalWageredIcon from 'vue-material-design-icons/DiceMultipleOutline.vue'
import TotalProfitIcon from 'vue-material-design-icons/CurrencyUsd.vue'
import TipsSentIcon from 'vue-material-design-icons/CallMade.vue'
import TipsReceivedIcon from 'vue-material-design-icons/CallReceived.vue'
import TipsRainIcon from 'vue-material-design-icons/CloudUploadOutline.vue'
import CashbackClaimedIcon from 'vue-material-design-icons/GiftOutline.vue'
import DailyFreeClaimedIcon from 'vue-material-design-icons/CalendarToday.vue'
import RainCollectedIcon from 'vue-material-design-icons/WeatherPouring.vue'
import TriviasCodeWonIcon from 'vue-material-design-icons/Alphabetical.vue'
import TriviasQuestionWonIcon from 'vue-material-design-icons/HeadQuestionOutline.vue'
import TriviasMathWonIcon from 'vue-material-design-icons/CalculatorVariantOutline.vue'

export default {
	name: 'Dashboard',

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Button,
		Skeleton,
		CoinsIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: true,
			categories: [
				{
					id: 'transactions',
					i18nKey: 'pages.profile.tabs.transactions.name',
					stats: [
						{
							id: 'totalDeposited',
							icon: TotalDepositedIcon
						},
						{
							id: 'totalWithdrawn',
							icon: TotalWithdrawnIcon
						},
						{
							id: 'totalWagered',
							icon: TotalWageredIcon
						},
						{
							id: 'totalProfit',
							icon: TotalProfitIcon
						}
					]
				},
				{
					id: 'tips',
					i18nKey: 'others.tips',
					stats: [
						{
							id: 'tipsSent',
							icon: TipsSentIcon
						},
						{
							id: 'tipsReceived',
							icon: TipsReceivedIcon
						},
						{
							id: 'tipsRain',
							icon: TipsRainIcon
						}
					]
				},
				{
					id: 'rewards',
					i18nKey: 'modals.rewards.name',
					stats: [
						{
							id: 'cashbackClaimed',
							icon: CashbackClaimedIcon
						},
						{
							id: 'dailyFreeClaimed',
							icon: DailyFreeClaimedIcon
						},
						{
							id: 'rainCollected',
							icon: RainCollectedIcon
						}
					]
				},
				{
					id: 'trivias',
					i18nKey: 'others.trivias',
					stats: [
						{
							id: 'triviasCodeWon',
							icon: TriviasCodeWonIcon
						},
						{
							id: 'triviasQuestionWon',
							icon: TriviasQuestionWonIcon
						},
						{
							id: 'triviasMathWon',
							icon: TriviasMathWonIcon
						}
					]
				}
			]
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

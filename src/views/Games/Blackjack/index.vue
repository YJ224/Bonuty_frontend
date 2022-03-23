<template>
	<div class="normal-page" style="max-width: calc(100% - 3vw - 3vw); height: calc(100% - 35px); position: absolute">

		<!-- History -->
		<div class="history" :class="{ 'chat-open': $store.state.chat.open }">
			<HistoryCard v-for="i in 20" :key="i" :loading="loading" />
		</div>

		<template v-if="loading">
			<div class="dealer">
				<!-- Table -->
					<div class="bg">
						<div class="container">
							<TableBg />
							<TableLine />
							<img src="@/assets/small-logo.png" alt="" />
						</div>
					</div>
			</div>
			<Loader className="bj-loader" v-if="loading" />
		</template>
		<template v-else>
			<!-- Dealer -->
			<div class="dealer">
				<!-- Table -->
				<div class="bg">
					<div class="container">
						<TableBg />
						<TableLine />
						<img src="@/assets/small-logo.png" alt="" />
					</div>
				</div>

				<!-- Cards Area -->
				<transition name="fade">
					<div class="cards-area g-fade-in" v-if="state !== 'open'">
						<div class="cards">
							<PlayingCard :number="7" type="spades" />
						</div>
					</div>
				</transition>
			</div>

			<!-- Middle -->
			<div class="middle">
				<div class="placeholder g-fade-in" v-if="state === 'open'">
					<div>{{ $t('pages.blackjack.placeholder.1') }}</div>
					<div>{{ $t('pages.blackjack.placeholder.2') }}</div>
				</div>
				<transition name="fade">
					<div class="action-panel g-fade-in" v-if="state !== 'open'">
						<div class="content">
							<div class="backline" />
							<div class="inner" :style="{ backgroundColor: state === 'ended' ? 'transparent' : '' }">
								<div class="got got-dealer">
									<div class="label">{{ $t('pages.blackjack.got.dealer') }}</div>
									<div class="amount">7</div>
								</div>
								<div class="widget">
									<!-- Action Side -->
									<transition name="fade">
										<div class="action-side" v-if="state === 'ingame'">
											<div class="at-stake">
												<img class="chip" v-for="(chip, i) in betAmountInChips" :key="`${i}:${chip}`" :src="`https://bounty-assets.fra1.cdn.digitaloceanspaces.com/chips/chip_${chip}.svg`" alt="" />
											</div>
											<transition name="fade">
												<div class="wrap" key="waiting" v-if="waitingDealer">
													<div class="waiting-dealer">{{ $t('pages.blackjack.waitingDealer') }}</div>
												</div>
												<div class="wrap" key="action" v-else>
													<div class="label">{{ $t('pages.blackjack.selectAction') }}</div>
													<div class="buttons">
														<Button color="secondary">{{ $t('pages.blackjack.actions.stand') }}</Button>
														<Button color="secondary">{{ $t('pages.blackjack.actions.hit') }}</Button>
														<Button color="secondary">{{ $t('pages.blackjack.actions.doubleDown') }}</Button>
													</div>
												</div>
											</transition>
										</div>
									</transition>
									<!-- Result Side -->
									<transition name="fade">
										<div class="result-side" v-if="state === 'ended'">
											<div class="result tie">{{ $t('others.tie') }}</div>
										</div>
									</transition>
								</div>
								<div class="got got-player">
									<div class="amount">11</div>
									<div class="label">{{ $t('pages.blackjack.got.player') }}</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>

			<!-- Player -->
			<div class="player">
				<transition name="fade">
					<div class="cards-area g-fade-in" v-if="state !== 'open'">
						<div class="cards">
							<PlayingCard :number="7" type="diamonds" />
							<PlayingCard :number="14" type="hearts" />
						</div>
					</div>
				</transition>
				<transition name="fade">
					<Button @click="resetGame" color="secondary g-fade-in" v-if="state === 'ended'">{{ $t('pages.blackjack.playAgainBtn') }}</Button>
				</transition>
			</div>

			<!-- Bet Panel -->
			<transition name="fade">
				<div class="bet-panel g-fade-in" v-if="state === 'open'">
					<div class="panel">
						<div class="left">
							<div class="label">{{ $t('pages.blackjack.betPanel.left') }}</div>
							<div class="content">
								<img class="chip lazy-from-bottom" v-for="chip in chips.betPanel" @click="add(chip)" :key="chip" v-lazy="`https://bounty-assets.fra1.cdn.digitaloceanspaces.com/chips/chip_+${chip}.svg`" alt="" />
							</div>
						</div>
						<div class="right">
							<div class="label">{{ $t('pages.blackjack.betPanel.right') }}</div>
							<div class="content">
								<BetInput v-model="betAmount" splitBtn doubleBtn maxBtn />
							</div>
						</div>
					</div>
					<div class="lower">
						<div class="at-stake">
							<template v-if="betAmountInChips.length">
								<div class="label">{{ $t('pages.blackjack.atStake') }}</div>
								<div class="chips">
									<img class="chip lazy-from-bottom" v-for="(chip, i) in betAmountInChips" :key="`${i}:${chip}`" v-lazy="`https://bounty-assets.fra1.cdn.digitaloceanspaces.com/chips/chip_${chip}.svg`" alt="" />
								</div>
								<BetButtons v-model="betAmount" clearBtn />
							</template>
						</div>
						<Button color="primary" width="200px" height="52px">{{ $t('pages.blackjack.playBtn') }}</Button>
					</div>
				</div>
			</transition>
		</template>

	</div>
</template>





<script>
// Import components
import HistoryCard from './HistoryCard'

// Import uikit
import BetInput from '@/uikit/BetInput'
import BetButtons from '@/uikit/BetButtons'
import Button from '@/uikit/Button'
import Loader from '@/uikit/Loader'
import PlayingCard from '@/uikit/PlayingCard'

// Import assets
import TableBg from '@/assets/blackjack/table-bg.svg'
import TableLine from '@/assets/blackjack/table-line.svg'

export default {
	name: 'Blackjack',

	// Components
	// --------------------------------------------------
	components: {
		HistoryCard,
		BetInput,
		BetButtons,
		Button,
		Loader,
		PlayingCard,
		TableBg,
		TableLine
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: true,
			state: 'open', // open, ingame, ended
			betAmount: '',
			betAmountInChips: [],
			waitingDealer: false,
			chips: {
				betPanel: [1, 5, 10, 25, 50, 100], // should be ascending
				available: [500, 100, 50, 25, 10, 5, 1, 0.5, 0.25, 0.1, 0.05, 0.01] // should be descending
			}
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * add()
		 */
		add(amount) {
			amount *= 100
			let value = Number(this.betAmount) * 100
			value += amount
			value /= 100
			if (value <= 0) value = ''
			else value = Math.floor(value * 100) / 100

			this.betAmount = value
		},

		/**
		 * resetGame()
		 * - resets lobby to it's initial state, cleans everything except betAmount
		 */
		resetGame() {
			this.state = 'open'
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		/**
		 * betAmount()
		 * - displays bet amount in chips
		 */
		betAmount() {
				let chipsAmount = Number(this.betAmount).toFixed(2) * 100
				this.betAmountInChips = []

				for (let i in this.chips.available) {
						while (chipsAmount >= Number(this.chips.available[i]).toFixed(2) * 100) {
								chipsAmount -= Number(this.chips.available[i]).toFixed(2) * 100
								this.betAmountInChips.push(this.chips.available[i])
						}
				}
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

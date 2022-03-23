<template>
	<div class="normal-page">

		<!-- Bonus Jackpot -->
		<div class="bonus-pot">
			<div class="container">
				<div class="left">
					<div class="title">{{ $t('pages.roulette.bonusPot.title') }}</div>
					<router-link to="?modal=bonus-pot" class="sub-title">
						<InfoIcon :size="12" />
						{{ $t('pages.roulette.bonusPot.subTitle') }}
					</router-link>
				</div>
				<div class="right">
					{{ $t('pages.roulette.bonusPot.amountLabel') }}
					<Skeleton class="bonus-pot-odometer" color="lighter" width="182.95px" height="25px" v-if="loading" />
					<IOdometer
						class="bonus-pot-odometer"
						:value="bonusPotAmount"
						theme="minimal"
						v-else
					/>
				</div>
			</div>
		</div>

		<!-- Timer -->
		<Skeleton class="timer" width="100%" height="30px" v-if="loading" />
		<div class="timer" v-else>
			<div class="back">
				<div class="bar" :style="{ width: (timer / maxTimeToRoll * 100) + '%' }" />
			</div>
			<div class="front">
				<div class="left">
					{{ $t('pages.roulette.roundId') }}
					<span>#{{ roundId }}</span>
				</div>
				<div class="right">
					{{
						(state === 'open' && timer === 0)
						? $t('pages.roulette.timer.rolling')
						: $t(`pages.roulette.timer.${state}`, { s: (timer / 1000).toFixed(2), color: $t(`pages.roulette.colors.${numberToColor(rolled)}`).toLowerCase() })
					}}
				</div>
			</div>
		</div>

		<!-- Previous Stats -->
		<div class="previous-stats">
			<div class="left">
				<div class="text">{{ $t('pages.roulette.previousRolls') }}</div>
				<div class="rolls-container">
					<template v-if="loading">
						<Skeleton class="roll" v-for="i in (($mq.resize && $mq.above($breakpoint.sm + 1)) ? 10 : 6)" :key="i" />
					</template>
					<template v-else>
						<div class="roll" v-for="roll in lastRolls.slice(0, (($mq.resize && $mq.above($breakpoint.sm + 1)) ? 10 : 6))" :key="roll" :class="numberToColor(roll)">{{ roll }}</div>
					</template>
				</div>
			</div>
			<div class="right">
				<div class="text">{{ $t('pages.roulette.last100Rolls') }}</div>
				<Skeleton class="last-100-container" width="170px" height="16px" v-if="loading" />
				<div class="last-100-container" v-else>
					<div class="last" v-for="color in colors" :key="color">
						<div class="dot" :class="color" />
						{{ last100[color] }}
					</div>
				</div>
			</div>
		</div>

		<!-- Spinner -->
		<div class="spinner" :disabled="loading || (state === 'open')">
			<Loader v-if="loading" />
			<div class="selector" :class="`${state === 'rolled' ? numberToColor(rolled) : ''}`">
				<div class="top-arrow" />
				<div class="bottom-arrow" />
			</div>
			<div class="wheel">
				<div class="wrap" :style="{ transform: `translate3d(${spinner.translate}px, 0px, 0px)`, transition: spinner.transition }">
					<div class="group" v-for="group in spinner.rows" :key="group">
						<div ref="tile" class="tile" v-for="tile in spinner.order" :key="`${group}:${tile}`" :class="numberToColor(tile)">{{ tile }}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bet Panel -->
		<div class="bet-panel">
			<BetInput v-model="betAmount" maxWidth="300px" clearBtn maxBtn :splitBtn="$mq.resize && $mq.below($breakpoint.md)" :doubleBtn="$mq.resize && $mq.below($breakpoint.md)" />
			<BetButtons v-model="betAmount" v-if="($mq.resize && $mq.below($breakpoint.md)) || ($mq.resize && $mq.above($breakpoint.lg + 1))" />
			<BetButtons v-model="betAmount" splitBtn doubleBtn v-if="$mq.resize && $mq.above($breakpoint.md + 1)" />
			<div class="public-seed" v-if="$mq.resize && $mq.above($breakpoint.md + 1)">
				<div class="icon">
					<LockIcon :size="18" />
				</div>
				<div class="content">
					<div class="label">{{ $t('pages.fairness.terms.publicSeed') }}</div>
					<div class="value">
						<span>{{ publicSeed }}</span>
						<div class="copy">
							<CopyIcon :size="14" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Separator -->
		<div class="separator" />

		<!-- Color Bets -->
		<div class="color-bets">
			<div class="column" v-for="color in colors" :key="color" :class="`${color}${state === 'rolled' && color === numberToColor(rolled) ? ' winner' : ''}`" :disabled="state === 'rolling' || (state === 'rolled' && (color !== numberToColor(rolled)))">

				<Button @click="$notify('error', 'Not enough balance to place this bet')" :color="`roulette-${color}`" width="100%" :disabled="loading || state !== 'open'">{{ `${$t(`pages.roulette.colors.${color}`)} ${(color === 'green' ? '14X' : '2X')}` }}</Button>

				<div class="stats">
					<Skeleton width="48px" height="16px" v-if="loading" />
					<div class="total-bets" v-else>{{ $tc('pages.roulette.betsAmount', bets[color].length) }}</div>

					<Skeleton width="48px" height="16px" v-if="loading" />
					<div class="total-amount" v-else>
						<ICountUp
							:endVal="Number((bets[color].reduce((a, b) => a + (b['amount'] || 0), 0) / 100).toFixed(2))"
							:options="$countupOptions"
						/>
					</div>
				</div>

				<transition-group tag="div" name="bet" class="bets g-fade-in" :class="`${color}${bets[color].length >= 11 ? ' on-limit' : ''}`" v-if="!loading">
					<div class="bet" v-for="bet in bets[color].slice(0, maxBets + 1)" :key="bet.id">
						<div class="user">
							<Avatar :src="bet.user.avatar" />
							<div class="username" v-if="$mq.resize && $mq.above($breakpoint.md + 1)">{{ bet.user.username }}</div>
						</div>
						<div class="amount">{{ $formatBalance(bet.amount) }}</div>
					</div>
				</transition-group>
			</div>
		</div>
	</div>
</template>





<script>
// Import dependencies
import IOdometer from 'vue-odometer'
import 'odometer/themes/odometer-theme-minimal.css'
import ICountUp from 'vue-countup-v2'

// Import uikit
import Avatar from '@/uikit/Avatar'
import BetButtons from '@/uikit/BetButtons'
import BetInput from '@/uikit/BetInput'
import Button from '@/uikit/Button'
import Loader from '@/uikit/Loader'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import CopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import InfoIcon from 'vue-material-design-icons/Information.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'

export default {
	name: 'Roulette',

	// Components
	// --------------------------------------------------
	components: {
		IOdometer,
		ICountUp,
		Avatar,
		BetButtons,
		BetInput,
		Button,
		Loader,
		Skeleton,
		CopyIcon,
		InfoIcon,
		LockIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			// Roulette
			loading: true,
			state: 'open', // open, rolling, rolled
			rolled: null, // number rolled
			bonusPotAmount: 565.23,
			roundId: 123456,
			timer: null, // in ms
			maxTimeToRoll: 20000, // in ms
			colors: ['gray', 'green', 'blue'],
			lastRolls: [13, 8, 4, 8, 10, 6, 1, 12, 0, 10],
			last100: {
				gray: 52,
				green: 6,
				blue: 42
			},
			spinner: {
				order: [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8],
				rows: 10,
				duration: 8000, // roll duration in ms
				translate: 0,
				transition: 'none',
				tileWidth: 80 + (3 * 2) // width + margin
			},
			betAmount: '',
			publicSeed: 'cc6b710a4bf6fbbbcda88edf71f00cd620bf5f3efd73cf6d',
			maxBets: 10,
			bets: {
				gray: [],
				green: [],
				blue: []
			}
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * numberToColor()
		 * - converts a number between 0 and 14 to color
		 */
		numberToColor(number) {
			if (number >= 1 && number <= 7) return 'blue'
			else if (number >= 8 && number <= 14) return 'gray'
			else if (number === 0) return 'green'
		},

		/**
		 * setStartingRoll()
		 * - sets spinner starting position (to last roll)
		 */
		setStartingRoll(roll, transition) {
			if (transition) this.spinner.transition = 'all 200ms'

			const wheelWidth = this.spinner.rows * 15 * this.spinner.tileWidth
			const initializedPos = (wheelWidth / 2) - (15 * this.spinner.tileWidth) - (this.spinner.order.indexOf(roll) * this.spinner.tileWidth) - (this.spinner.tileWidth / 2)
			this.spinner.translate = initializedPos
		},

		/**
		 * startTimer()
		 * - starts countdown to roll
		 */
		startTimer(ms) {
			this.state = 'open'
			this.timer = ms

			const startTime = Date.now()

			let timerInterval = setInterval(() => {
				const elapsedTime = Date.now() - startTime

				this.timer = ms - elapsedTime

				if (this.timer <= 0) {
					clearInterval(timerInterval)
					this.timer = 0

					setTimeout(() => {
						this.rollSpinner(0)
					}, 1000)
				}
			}, 10)
		},

		/**
		 * rollSpinner()
		 * - roll spinner
		 */
		rollSpinner(roll) {
			this.state = 'rolling'

			// Get starting and landing position
			const startingPosition = ((this.spinner.tileWidth * 15 * this.spinner.rows) / 2) - (this.spinner.tileWidth * 15)
			const landingIndex = this.spinner.order.indexOf(roll)
			const landingPosition = ((this.spinner.tileWidth * 15 * (this.spinner.rows - 1)) + (landingIndex * this.spinner.tileWidth) - (this.spinner.tileWidth * 15) * 2) - startingPosition

			// Move spinner to the very beginning (take advantage for roll)
			/* this.spinner.transition = 'none'
			this.spinner.translate = startingPosition */

			// Randomize landing in card (will make this come from BE tho)
			const randomMin = 3 // +3 cuz of margin
			const randomMax = this.spinner.tileWidth - 3
			const randomizedLanding = this.$randomNumberBetween(randomMin, randomMax)

			// Roll spinner
			this.spinner.transition = `all ${this.spinner.duration}ms cubic-bezier(0.05, 0.85, 0.25, 1) 0s`
			this.spinner.translate = -(landingPosition + randomizedLanding)

			setTimeout(() => {
				this.finishRoll(roll, randomizedLanding)
			}, this.spinner.duration)
		},

		/**
		 * finishRoll()
		 * - finish roll, show winner, move spinner to starting position
		 */
		finishRoll(rolled, randomizedLanding) {
			this.state = 'rolled'
			this.rolled = rolled

			// Move spinner to beginning for next spin
			const wheelWidth = this.spinner.rows * 15 * this.spinner.tileWidth
			const initializedPos = (wheelWidth / 2) - (15 * this.spinner.tileWidth) - (this.spinner.order.indexOf(rolled) * this.spinner.tileWidth) - (this.spinner.tileWidth / 2)
			this.spinner.transition = 'none'
			this.spinner.translate = initializedPos - (this.spinner.tileWidth / 2) + this.spinner.tileWidth - randomizedLanding

			setTimeout(() => {
				// Center spinner on rolled tile
				const landedPosition = initializedPos - (this.spinner.tileWidth / 2) + randomizedLanding
				this.spinner.transition = 'all 500ms'
        this.spinner.translate = landedPosition - randomizedLanding + (this.spinner.tileWidth / 2)

				// Reset round
				setTimeout(() => {
					this.resetRound()
				}, 500)
			}, 1000)
		},

		/**
		 * resetRound()
		 * - clears and resets round
		 */
		resetRound() {
			// Clear bets
			this.bets = {
				gray: [],
				green: [],
				blue: []
			}

			// Reset spinner transition
			this.spinner.transition = 'none'

			setTimeout(() => {
				this.startTimer(20000)
			}, 1000);
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		this.setStartingRoll(0, false)
		setTimeout(() => {
			this.loading = false
			this.setStartingRoll(4, true)

			this.startTimer(8000)
		}, 400)
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

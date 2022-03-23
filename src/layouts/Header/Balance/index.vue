<template>
	<div class="balance-wrap">
		<!-- Balance -->
			<div class="balance" v-if="!noBalance">
				<div class="bal-content">
					<CoinsIcon />
					<ICountUp
						:class="{ counting }"
						:endVal="Number((5742 / 100).toFixed(2))"
						:options="$countupOptions"
						@ready="counting = false"
					/>
				</div>
				<router-link class="deposit" to="/deposit">
					<Button color="primary" height="100%">
						<DepositIcon :size="20" />
					</Button>
				</router-link>
			</div>

			<!-- Withdraw Btn -->
			<router-link class="withdraw" to="/withdraw" v-if="!noWithdraw">
				<Button color="transparent">
					<WithdrawIcon :size="16" />
				</Button>
			</router-link>
	</div>
</template>





<script>
// Import dependencies
import ICountUp from 'vue-countup-v2'

// Import uikit
import Button from '@/uikit/Button'

// Import icons
import CoinsIcon from '@/assets/icons/coins.svg'
import DepositIcon from 'vue-material-design-icons/Plus.vue'
import WithdrawIcon from 'vue-material-design-icons/Cart.vue'

export default {
	name: 'Balance',

	// Props
	// --------------------------------------------------
	props: {
		noBalance: Boolean,
		noWithdraw: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		ICountUp,
		Button,
		CoinsIcon,
		DepositIcon,
		WithdrawIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			counting: false
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		this.counting = true
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

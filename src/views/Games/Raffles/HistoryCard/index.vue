<template>
	<div class="card" :style="{ pointerEvents: loading ? 'none' : '' }">
		<v-popover offset="5" popoverClass="from-top raffle-history-popover" :open="isPopoverVisible" @show="isPopoverVisible = true" @hide="isPopoverVisible = false">

			<!-- Button -->
			<div class="wrap" :class="{ active: isPopoverVisible }">
				<Skeleton width="100%" height="100%" v-if="loading" />
				<div class="content g-fade-in" v-else>
					<div class="user">
						<Avatar :src="$store.state.user.avatar" size="34px" />
						<div class="username">Skymax</div>
					</div>
					<div class="skin" v-tooltip.bottom="!isPopoverVisible ? 'AK-47 | Arctic Ops (Field-Tested)' : ''">
						<img class="lazy-from-right" v-lazy="'https://steamcommunity-a.akamaihd.net/economy/image/class/730/2396156014/80fx50f'">
					</div>
				</div>
			</div>

			<!-- Popover -->
			<template slot="popover">
				<div class="popover">
					<div class="top">
						<div class="amount">57.42</div>
						<div class="players">
							<div class="player">
								<Avatar :src="$store.state.user.avatar" size="34px" />
							</div>
							<div class="player">
								<Avatar :src="$store.state.user.avatar" size="34px" />
							</div>
							<div class="player">
								<Avatar :src="$store.state.user.avatar" size="34px" />
							</div>
						</div>
					</div>
					<div class="middle">
						<div class="left">
							<TicketIcon :size="12" /> 11.23
						</div>
						<div class="right">25%</div>
					</div>
					<div class="line"></div>
					<div class="bottom">
						<router-link to="/raffles/2314" @click.native="isPopoverVisible = false">
							<Button color="transparent" width="30px" height="30px" class="replay">
								<ReplayIcon :size="18" />
							</Button>
						</router-link>
						<button class="share">
							<ShareIcon />
							{{ $t('others.share') }}
						</button>
					</div>
				</div>
			</template>

		</v-popover>
	</div>
</template>





<script>
// Import uikit
import Avatar from '@/uikit/Avatar'
import Button from '@/uikit/Button'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import ReplayIcon from 'vue-material-design-icons/Replay.vue'
import ShareIcon from '@/assets/icons/share.svg'
import TicketIcon from 'vue-material-design-icons/TicketConfirmation.vue'

export default {
	name: 'HistoryCard',

	// Props
	// --------------------------------------------------
	props: {
		loading: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Button,
		Skeleton,
		ReplayIcon,
		ShareIcon,
		TicketIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			isPopoverVisible: false
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		closePopover() {
			this.isPopoverVisible = false
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

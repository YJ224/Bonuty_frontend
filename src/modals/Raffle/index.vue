<template>
	<!-- Modal Loader -->
	<Skeleton width="100%" :height="`${raffleModal.height}px`" v-if="loading" />

	<!-- Modal Content -->
	<div class="modal-inner" v-else>

		<!-- Title -->
		<div class="title">{{ $t('modals.raffle.title', { id: $route.params.id }) }}</div>

		<!-- Skin -->
		<div class="skin">
			<SkinBg size="86" />
			<img src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/2396156014/200fx125f" alt="" />
			<div class="price">
				<CoinsIcon />
				{{ $formatBalance(12563) }}
			</div>
			<div class="name">{{ $splitSkin('csgo', 'item', 'AK-47 | Arctic Ops (Field-Tested)') }} | {{ $splitSkin('csgo', 'name', 'AK-47 | Arctic Ops (Field-Tested)') }}</div>
			<div class="wear">{{ $splitSkin('csgo', 'wear', 'AK-47 | Arctic Ops (Field-Tested)') }}</div>
		</div>

		<!-- Stats -->
		<div class="stats">
			<div class="ticket-price">
				<div>{{ $t('modals.raffle.ticketPrice') }}</div>
				<div>
					<CoinsIcon />
					{{ $formatBalance(2423) }}
				</div>
			</div>
			<div class="bar">
				<div style="width: 40%" />
			</div>
			<div class="total-slots">
				<div>{{ $t('modals.raffle.totalSlots') }}</div>
				<div>2/5</div>
			</div>
		</div>

		<!-- Tickets -->
		<div class="tickets">
			<div class="ticket empty" v-for="slot in 4" :key="slot" :class="{ selected: selectedSlots.includes(slot) }" @click="selectSlot(slot)">
				<div class="front">{{ slot }}</div>
				<div class="back"></div>
			</div>
		</div>

		<!-- Butttons -->
		<div class="buttons">
			<Button color="primary" width="100%" height="100%" :disabled="!selectedSlots.length">
				<i18n :path="`modals.raffle.buyBtn.${selectedSlots.length ? 'enabled' : 'disabled'}`">
					<template v-slot:amount>
						<CoinsIcon fill="#fff" style="margin-left: 6px" />
						{{ $formatBalance(245) }}
					</template>
				</i18n>
			</Button>
			<Button color="secondary" width="50px" padding="0">
				<img src="https://bounty-assets.fra1.cdn.digitaloceanspaces.com/bot-avatar-transparent.png" alt="" />
			</Button>
		</div>

		<!-- Hashed Secret -->
		<div class="hashed-secret">
			<div class="icon">
				<LockIcon :size="18" />
			</div>
			<div class="container">
				<div class="label">{{ $t('pages.fairness.terms.hashedSecret') }}</div>
				<div class="value">
					<span>5da611bf2f5ee2c50caa6072f1bf19f6c20f2bc2f3b7f3f40ae956d9b5543f8f5102ba2ff5df00eec94af8a08128c0972fc81fca8686cd0a2d1c61b7fafe1208</span>
					<div class="copy">
						<CopyIcon :size="14" />
					</div>
				</div>
			</div>
		</div>

	</div>
</template>





<script>
// Import modals
import modals from '../modals'

// Import uikit
import Button from '@/uikit/Button'
import Skeleton from '@/uikit/Skeleton'
import SkinBg from '@/uikit/SkinBg'

// Import icons
import CoinsIcon from '@/assets/icons/coins.svg'
import CopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'

export default {
	name: 'Raffle',

	// Components
	// --------------------------------------------------
	components: {
		Button,
		Skeleton,
		SkinBg,
		CoinsIcon,
		CopyIcon,
		LockIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: false,
			selectedSlots: []
		}
	},

	// Computed
	// --------------------------------------------------
	computed: {
		raffleModal() {
			return modals.find(e => e.id === 'raffle')
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * selectSlot()
		 */
		selectSlot(slot) {
			// If it's selected
			if (this.selectedSlots.includes(slot)) {
				this.selectedSlots = this.selectedSlots.filter(e => e !== slot)

			// If it's NOT selected
			} else {
				this.selectedSlots.push(slot)
			}

			// Sort selected slots
			this.selectedSlots.sort()
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

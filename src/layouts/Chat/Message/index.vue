<template>
	<div class="message" v-if="!invalidGIF" v-click-outside="closeOverlay" @click="handleClick" @contextmenu.prevent="handleRightClick" @dblclick="handleRightClick('dbl')">
		<div class="info">

			<!-- Left -->
			<div class="left">
				<Avatar size="20px" :src="$store.state.user.avatar" />
				<Level :lvl="85" />
				<div class="username">
					<span>{{ $formatUsername('Skymax') }}</span>
				</div>
			</div>

			<!-- Right -->
			<div class="right">
				<div class="time">3h ago</div>
			</div>

		</div>

		<!-- GIF message -->
		<div class="msg" v-if="data.msg.startsWith('gif:')">
			<div
				class="gif"
				:style="{
					// Handle aspect ratio
					width: getGIFWidth(),
					height: getGIFHeight()
				}"
			>
				<Skeleton width="100%" height="100%" color="light" />
				<img v-lazy="`https://media.tenor.com/images/${data.msg.split(':')[2]}/tenor.gif`" alt="" />
			</div>
		</div>

		<!-- Normal message with emote -->
		<div class="msg" v-else-if="data.msg.match(emotesRegex)" v-html="getMsgWithEmotes()"></div>

		<!-- Normal message -->
		<div class="msg" v-else>
			{{ data.msg }}
		</div>

		<!-- Overlay -->
		<transition name="fade">
			<div class="overlay user-overlay" v-if="overlay">
				<div class="overlay-content">
					<router-link to="?modal=user&id=12321" v-tooltip="$t('layouts.chat.overlayButtons.profile')">
						<UserIcon :size="22" />
					</router-link>
					<button v-tooltip="$t('layouts.chat.overlayButtons.tip')" v-if="$store.state.user.authenticated">
						<TipIcon :size="22" />
					</button>
					<button v-tooltip="$t('layouts.chat.overlayButtons.ignore')" v-if="$store.state.user.authenticated">
						<IgnoreIcon :size="20" />
					</button>
					<button v-tooltip="$t('layouts.chat.overlayButtons.copyUID')">
						<CopyIcon :size="18" />
					</button>
				</div>
			</div>
		</transition>

		<!-- Remove Overlay -->
		<transition name="fade">
			<div class="overlay staff-overlay" v-if="staffOverlay">
				<div class="overlay-content">
					<button v-tooltip="$t('layouts.chat.overlayButtons.mute')">
						<MuteIcon :size="20" />
					</button>
					<button v-tooltip="$t('layouts.chat.overlayButtons.delete')">
						<TrashIcon :size="22" />
					</button>
					<button v-tooltip="$t('layouts.chat.overlayButtons.deleteAll')">
						<TrashAllIcon :size="22" />
					</button>
					<button v-tooltip="$t('layouts.chat.overlayButtons.ban')">
						<BanIcon :size="22" />
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>





<script>
// Import uikit
import Avatar from '@/uikit/Avatar'
import Level from '@/uikit/Level'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import BanIcon from 'vue-material-design-icons/AccountOffOutline.vue'
import CopyIcon from 'vue-material-design-icons/ContentCopy.vue'
import IgnoreIcon from 'vue-material-design-icons/EyeOffOutline.vue'
import MuteIcon from 'vue-material-design-icons/MicrophoneOff.vue'
import TipIcon from 'vue-material-design-icons/CurrencyUsd.vue'
import TrashIcon from 'vue-material-design-icons/TrashCanOutline.vue'
import TrashAllIcon from 'vue-material-design-icons/TrashCan.vue'
import UserIcon from 'vue-material-design-icons/AccountOutline.vue'

export default {
	name: 'Message',

	// Props
	// --------------------------------------------------
	props: {
		data: Object
	},

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Level,
		Skeleton,
		BanIcon,
		CopyIcon,
		IgnoreIcon,
		MuteIcon,
		TipIcon,
		TrashIcon,
		TrashAllIcon,
		UserIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			overlay: false,
			staffOverlay: false,
			invalidGIF: false,
			emotesRegex: /(:|<:|<a:)((\w{1,64}:\d{17,18})|(\w{1,64}))(:|>)/gi
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * getGIFWidth()
		 * - get and validate GIF's width
		 */
		getGIFWidth() {
			const gifWidth = Number(this.data.msg.split(':')[1].split('x')[0])

			if (gifWidth > 150) return '150px'

			return `${gifWidth}px`
		},

		/**
		 * getGIFHeight()
		 * - get and validate GIF's height
		 */
		getGIFHeight() {
			const gifWidth = Number(this.data.msg.split(':')[1].split('x')[0])
			const gifHeight = Number(this.data.msg.split(':')[1].split('x')[1])

			if (gifWidth > 150) return `${(gifHeight * 150) / gifWidth}px`

			return `${gifHeight}px`
		},

		/**
		 * setInvalidGIF()
		 */
		setInvalidGIF() {
			this.invalidGIF = true
		},

		/**
		 * getMsgWithEmotes()
		 * - returns message with :emotes: replaced by <img> tags
		 * - BE CAREFUL WITH XSS, MAKE SURE TO $sanitizeString()
		 */
		getMsgWithEmotes() {
			const emotesKeys = this.data.msg.match(this.emotesRegex)
			let msg = this.$sanitizeString(this.data.msg)

			for (let i in emotesKeys) {
				const emoteKey = emotesKeys[i]
				const emote = this.$store.state.chat.emotes.find(e => e.key === emoteKey.replace(/:/g, ''))

				if (emote) msg = msg.replace(emoteKey, `<img class="chat-emote" src="${emote.src}" alt="" />`)
			}

			return msg
		},

		/**
		 * handleClick()
		 * - toggles user overlay
		 */
		handleClick() {
			// Toggle user overlay
			if (this.staffOverlay !== true) this.overlay = !this.overlay

			// Close staff overlay
			this.staffOverlay = false
		},

		/**
		 * handleRightClick()
		 * - toggles staff overlay
		 */
		handleRightClick(type) {
			// Prevent if unauthenticated
			if (!this.$store.state.user.authenticated) return

			// Prevent open with double click if isn't a mobile or tablet
			if (type === 'dbl' && (window.innerWidth > this.$breakpoint.lg)) return

			// Toggle staff overlay
			if (this.overlay !== true) this.staffOverlay = !this.staffOverlay

			// Close user overlay
			this.overlay = false
		},

		/**
		 * closeOverlay()
		 */
		closeOverlay() {
			this.overlay = false
			this.staffOverlay = false
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		// Verify GIF aspect ratio
		if (this.data.msg.startsWith('gif:')) {
			const gifWidth = Number(this.data.msg.split(':')[1].split('x')[0])
			const gifHeight = Number(this.data.msg.split(':')[1].split('x')[1])

			if (!gifWidth || !gifHeight) this.invalidGIF = true
			if (5 < gifWidth / gifHeight || gifWidth / gifHeight < 0.2) this.invalidGIF = true
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

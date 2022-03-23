<template>
	<div id="app">
		<NprogressContainer />

		<!-- Mobile Menu -->
		<template v-if="$mq.resize && $mq.below($breakpoint.md)">
			<!-- Overlay -->
			<transition name="fade">
				<div @click="$store.commit('mobileMenu:close')" class="overlay" v-if="$store.state.mobileMenu" />
			</transition>

			<!-- Menu -->
			<transition name="mobile-menu">
				<MobileMenu v-if="$store.state.mobileMenu" />
			</transition>
		</template>

		<!-- Main -->
		<main class="main" :class="{ 'chat-open': $store.state.chat.open }">
			<!-- Header -->
			<Header />

			<!-- Container -->
			<div class="container">

				<!-- Profile Menu -->
				<transition name="profile-menu" v-if="$mq.resize && $mq.above($breakpoint.md + 1)">
					<ProfileMenu v-if="$route.name === 'Profile'" />
				</transition>

				<div id="progressBar" class="wrapper">
					<!-- Main Content -->
					<div id="site-scroll" class="content">
						<div class="wrap">
							<div class="page">
								<router-view />
							</div>

							<!-- Footer -->
							<Footer />
						</div>
					</div>

					<!-- Modals -->
					<transition name="modals">
						<ModalContent v-if="$store.state.modals.open" />
					</transition>
				</div>

			</div>

			<!-- Mobile Bar -->
			<MobileBar v-if="$mq.resize && $mq.below($breakpoint.md)" />

			<!-- Chat Btn -->
			<div class="chat-btn" @click="$store.commit('chat:open')" v-if="!$store.state.chat.open && ($mq.resize && $mq.above($breakpoint.md + 1))">
				<ChatIcon :size="18" />
			</div>
		</main>

		<!-- Chat Overlay -->
		<transition name="fade" v-if="$mq.resize && $mq.below($breakpoint.lg)">
			<div @click="$store.commit('chat:close')" class="overlay" v-if="$store.state.chat.open" />
		</transition>

		<!-- Chat -->
		<transition name="chat">
			<Chat v-if="$store.state.chat.open" />
		</transition>

	</div>
</template>





<script>
// Import dependencies
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

// Import components
import Chat from '@/layouts/Chat'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
const MobileBar = () => import(/* webpackChunkName: "mobile-bar" */ '@/layouts/MobileBar')
const MobileMenu = () => import(/* webpackChunkName: "mobile-menu" */ '@/layouts/MobileMenu')
import ProfileMenu from '@/views/Profile/ProfileMenu'

// Import modals
import ModalContent from '@/modals'
import modals from '@/modals/modals'

// Import icons
import ChatIcon from 'vue-material-design-icons/Message.vue'

export default {
	name: 'App',

	// Components
	// --------------------------------------------------
	components: {
		NprogressContainer,
		Chat,
		Footer,
		Header,
		MobileBar,
		MobileMenu,
		ProfileMenu,
		ModalContent,
		ChatIcon
	},

	// Watch
	// --------------------------------------------------
	watch: {
		$route(to) {
			// Open modal
			if (to.query.modal) {
				// Close raffle modal
				if ((to.name === 'Raffles') && to.params.id) {
					this.$router.push('/raffles?modal=' + to.query.modal)
				}

				this.$store.commit('modals:open', to.query.modal)

				// Close chat when opening modals on mobile
				if (window.innerWidth <= this.$breakpoint.sm) this.$store.commit('chat:close')
			} else {
				this.$store.state.modals.open = undefined
			}

			// Open raffle modal
			if ((to.name === 'Raffles') && to.params.id && !to.query.modal) {
				this.$store.commit('modals:open', 'raffle')
			}
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		// Open modal if exists
		if (this.$route.query.modal && modals[this.$route.query.modal]) {
			this.$store.commit('modals:open', this.$route.query.modal)
		}

		// Open raffle modal
		if ((this.$route.name === 'Raffles') && this.$route.params.id) {
			this.$store.commit('modals:open', 'raffle')

			// Remove modal query on raffle modal
			if (this.$route.query.modal) {
				this.$router.replace({ modal: null })
			}
		}

		// Remove modal query if doesn't exist
		if (this.$route.query.modal && !modals[this.$route.query.modal]) {
			this.$router.replace({ modal: null })
		}

		// Console Warning
		console.log('%c----------------------------------------------------------', 'font-size: 28px; color: crimson; font-weight: 600')
		console.log(`%c--= ${this.$t('site.consoleWarning.title')} =--`, 'font-size: 28px; color: crimson; font-weight: 600')
		console.log('')
		console.log(`%c${this.$t('site.consoleWarning.lines.1')}.`, 'font-size: 20px; color: #fff; font-weight: 400')
		console.log(`%c${this.$t('site.consoleWarning.lines.2')}.`, 'font-size: 20px; color: #fff; font-weight: 400')
		console.log(`%c${this.$t('site.consoleWarning.lines.3', { siteName: this.$siteName })}.`, 'font-size: 20px; color: #fff; font-weight: 400')
		console.log('%c----------------------------------------------------------', 'font-size: 28px; color: crimson; font-weight: 600')
	},

	// Created
	// --------------------------------------------------
	created() {
		// Close menus by default on mobiles and tablets
		if (window.innerWidth <= this.$breakpoint.lg) {
			this.$store.commit('chat:close')
			this.$store.commit('mobileMenu:close')
		}
	}
}
</script>





<style src="./App.scss" lang="scss" scoped></style>

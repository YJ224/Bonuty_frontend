<template>
	<header class="header" :class="getMenuClass()">

		<!-- TOP -->
		<div class="top">
			<div class="wrap">

				<!-- Left Section -->
				<div class="left">
					<div class="logo">
						<router-link to="/">
							<img src="@/assets/small-logo.png" alt="" v-if="$mq.resize && $mq.below($breakpoint.lg)" />
							<img src="@/assets/logo.png" alt="" v-else />
						</router-link>
					</div>
					<div class="games" v-if="$mq.resize && $mq.above($breakpoint.md + 1)">

						<router-link v-for="game in $games" :key="game.id" :to="game.path" :class="{ active: $route.name === game.name }" v-if="game.enabled">
							<div class="content">
								<component :is="game.icon" :class="`${game.id}-icon`" />
								{{ $t(game.i18nKey) }}
							</div>
						</router-link>

					</div>
				</div>

				<!-- Middle Section -->
				<div class="middle">
					<Balance noWithdraw v-if="$store.state.user.authenticated && ($mq.resize && $mq.below($breakpoint.md))" />
				</div>

				<!-- Right Section -->
				<div class="right">

					<!-- Authenticated -->
					<div class="authenticated" v-if="$store.state.user.authenticated">
						<!-- User Area -->
						<template v-if="$mq.resize && $mq.above($breakpoint.md + 1)">
							<!-- Balance -->
							<Balance />

							<!-- Separator -->
							<div class="separator" />

							<!-- User -->
							<router-link class="user" to="/profile/dashboard">
								<!-- Avatar + Username -->
								<Button color="transparent" height="42px">
									<div class="btn-content">
										<div>{{ $formatUsername('Skymax') }}</div>
									</div>
									<Avatar :src="$store.state.user.avatar" size="28px" />
								</Button>
							</router-link>
						</template>

						<!-- Withdraw Btn (Mobile) -->
						<Balance noBalance v-else />
					</div>

					<!-- Not Authenticated -->
					<div class="not-authenticated" v-else>
						<router-link to="?modal=auth&tab=login">
							<Button color="primary" height="100%">{{ $t('modals.auth.login.name') }}</Button>
						</router-link>
						<router-link to="?modal=auth&tab=register">
							<Button color="secondary" height="100%">{{ $t('modals.auth.register.name') }}</Button>
						</router-link>
					</div>

				</div>
			</div>
		</div>


		<!-- BOTTOM -->
		<div class="bottom" v-if="$mq.resize && $mq.above($breakpoint.md + 1)">
			<div class="wrap">
				<div class="left">
					<div class="links">

						<!-- Links -->
						<router-link v-for="link in links" :key="link.id" :class="{ highlight: link.highlight }" :to="link.to">
							<component :is="link.icon" :size="14" v-if="link.id === 'rewards'" />
							{{ $t(link.i18nKey) }}
						</router-link>

					</div>
				</div>
				<div class="right" v-if="$store.state.user.authenticated">
					<div class="level">
						<Level :lvl="499" />
						<div class="level-bar" v-tooltip.bottom="'1850/2000 xp'">
							<div style="width: 20%" />
						</div>
						<Level :lvl="500" />
					</div>
				</div>
			</div>
		</div>

	</header>
</template>





<script>
// Import components
import Balance from './Balance'

// Import links
import links from './links'

// Import uikit
import Avatar from '@/uikit/Avatar'
import Button from '@/uikit/Button'
import Level from '@/uikit/Level'

export default {
	name: 'Header',

	// Components
	// --------------------------------------------------
	components: {
		Balance,
		Avatar,
		Button,
		Level
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			showUserPopup: false,
			userPopupCount: -1,
			links
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * getMenuClass()
		 * - handles menus open
		 */
		getMenuClass() {
			const routesWithMenu = [
				'profile'
			]

			return routesWithMenu.includes(this.$route.name?.toLowerCase()) ? `menu-${this.$route.name?.toLowerCase()}` : ''
		},

		/**
		 * handleUserPopupClick()
		 * - toggles user popup
		 */
		handleUserPopupClick() {
			this.userPopupCount = -1
			this.showUserPopup = !this.showUserPopup
		},

		/**
		 * handleUserPopupClickOutside()
		 * - close popup when clicking outside
		 */
		handleUserPopupClickOutside() {
			this.userPopupCount++
			if (this.userPopupCount > 0) {
				this.showUserPopup = false
				this.userPopupCount = -1
			}
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

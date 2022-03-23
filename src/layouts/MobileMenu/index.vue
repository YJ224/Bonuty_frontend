<template>
	<aside class="mobile-menu">

		<!-- Header -->
		<router-link to="/profile/dashboard" @click.native="$store.commit('mobileMenu:close')" v-if="$store.state.user.authenticated">
			<div class="header">
				<div class="left">
					<Avatar size="30px" :src="$store.state.user.avatar" />
					<div class="username">{{ $store.state.user.username }}</div>
				</div>
				<div class="right">
					<LogoutIcon class="logout" :size="18" />
				</div>
			</div>
		</router-link>

		<!-- Content -->
		<div class="content">
			<div class="links">

				<!-- Links -->
				<router-link
					class="link"
					@click.native="$store.commit('mobileMenu:close')"
					v-for="link in links"
					:key="link.id"
					:class="{ active: $route.params.tab === link.id, highlight: link.highlight }"
					:to="link.to"
					v-if="((link.requiresAuth && $store.state.user.authenticated) || !link.requiresAuth) && (link.to.startsWith('/') || link.to.startsWith('?')) && !link.hideOnMobileMenu"
				>
					<div>
						<div class="icon">
							<component :is="link.icon" :size="18" />
						</div>
						{{ $t(link.i18nKey) }}
					</div>
				</router-link>

				<a class="link" :href="link.to" target="_blank" rel="noopener noreferrer" v-else-if="((link.requiresAuth && $store.state.user.authenticated) || !link.requiresAuth) && !link.hideOnMobileMenu">
					<div>
						<div class="icon">
							<component :is="link.icon" :size="18" />
						</div>
						{{ $t(link.i18nKey) }}
					</div>
				</a>

			</div>
		</div>

		<!-- Footer -->
		<div class="footer" v-if="$store.state.user.authenticated">
			<div class="level-bar">
				<Level :lvl="85" />
				<div class="bar">
					<div style="width: 20%" />
				</div>
				<Level :lvl="900" />
			</div>
		</div>

	</aside>
</template>





<script>
// Import links
import headerLinks from '@/layouts/Header/links'
import profileTabs from '@/views/Profile/tabs'

// Import uikit
import Avatar from '@/uikit/Avatar'
import Level from '@/uikit/Level'

// Import icons
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import SupportIcon from 'vue-material-design-icons/Lifebuoy.vue'

export default {
	name: 'MobileMenu',

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Level,
		LogoutIcon,
		SupportIcon,
	},

	data() {
		return {
			links: [
				...headerLinks,
				{
					id: 'support',
					i18nKey: 'others.support',
					to: this.$helpdesk,
					icon: SupportIcon
				},
				...profileTabs
			]
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

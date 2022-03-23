<template>
	<aside class="profile-menu">
		<div class="title">
			<UserIcon :size="22" />
			{{ $t('pages.profile.name') }}
		</div>
		<div class="links">
			<router-link :to="link.to" class="link" v-for="link in links" :key="link.id" :class="{ active: $route.params.tab === link.id }">
				<div>
					<component :is="link.icon" :class="`icon-${link.key}`" :size="20" />
					{{ $t(link.i18nKey) }}
				</div>
			</router-link>
		</div>
	</aside>
</template>





<script>
// Import links
import profileTabs from '../tabs'

// Import icons
import UserIcon from 'vue-material-design-icons/AccountCircle.vue'

export default {
	name: 'ProfileMenu',

	// Components
	// --------------------------------------------------
	components: {
		UserIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			links: profileTabs
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

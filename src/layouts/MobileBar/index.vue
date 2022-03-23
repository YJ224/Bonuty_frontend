<template>
	<nav class="mobile-bar">

		<!-- Menu -->
		<button @click="$store.commit('mobileMenu:open')">
			<div class="content">
				<MenuIcon :size="18" class="menu-icon" />
				{{ $t('layouts.mobileNav.name') }}
			</div>
		</button>

		<!-- Games -->
		<router-link v-for="game in $games" :key="game.id" :to="game.path" :class="{ active: $route.name === game.name }" v-if="game.enabled">
			<div class="content">
				<component :is="game.icon" :class="`${game.id}-icon`" />
				{{ $t(game.i18nKey) }}
			</div>
		</router-link>

		<!-- Chat -->
		<button @click="$store.commit('chat:open')">
			<div class="content">
				<ChatIcon :size="15" />
				{{ $t('layouts.chat.name') }}
			</div>
		</button>

	</nav>
</template>





<script>
// Import icons
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import ChatIcon from 'vue-material-design-icons/MessageOutline.vue'

export default {
	name: 'MobileBar',

	// Components
	// --------------------------------------------------
	components: {
		MenuIcon,
		ChatIcon
	},
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

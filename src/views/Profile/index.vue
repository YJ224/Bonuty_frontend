<template>
		<component :is="$route.params.tab" />
</template>





<script>
// Import uikit
import LoadingState from '@/uikit/LoadingState'

const tabsConfig = {
	loading: LoadingState,
	delay: 0
}

// Import tabs
const Dashboard = () => ({ component: import(/* webpackChunkName: "profile:dashboard" */ './Tabs/Dashboard'), ...tabsConfig })
const Transactions = () => ({ component: import(/* webpackChunkName: "profile:transactions" */ './Tabs/Transactions'), ...tabsConfig })

// Import links
import profileTabs from './tabs'

export default {
	name: 'Profile',

	// Components
	// --------------------------------------------------
	components: {
		Dashboard,
		Transactions
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		// Select first tab if none is selected or selected doesn't exist
		if (!this.$route.params.tab || !profileTabs.filter(e => e.id === this.$route.params.tab).length) {
			this.$router.push(profileTabs[0].to)
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

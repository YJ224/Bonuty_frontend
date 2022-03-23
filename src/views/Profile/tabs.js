// Import icons
import ChartIcon from 'vue-material-design-icons/ChartArc.vue'
import TransactionsIcon from 'vue-material-design-icons/FormatListBulletedSquare.vue'
import IgnoredUsersIcon from 'vue-material-design-icons/EyeOffOutline.vue'
import SettingsIcon from 'vue-material-design-icons/Cog.vue'

export default [
	{
		id: 'dashboard',
		i18nKey: 'pages.profile.tabs.dashboard.name',
		to: '/profile/dashboard',
		icon: ChartIcon,
		requiresAuth: true,
		hideOnMobileMenu: true
	},
	{
		id: 'transactions',
		i18nKey: 'pages.profile.tabs.transactions.name',
		to: '/profile/transactions/deposits',
		icon: TransactionsIcon,
		requiresAuth: true
	},
	{
		id: 'ignored-users',
		i18nKey: 'pages.profile.tabs.ignoredUsers.name',
		to: '/profile/ignored-users',
		icon: IgnoredUsersIcon,
		requiresAuth: true
	},
	{
		id: 'settings',
		i18nKey: 'pages.profile.tabs.settings.name',
		to: '/profile/settings',
		icon: SettingsIcon,
		requiresAuth: true
	}
]

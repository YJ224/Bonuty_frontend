import Vue from 'vue'
import scssVariables from '@/styles/theme.scss'

// Import icons
import RouletteIcon from '@/assets/icons/roulette.svg'
import RafflesIcon from '@/assets/icons/raffles.svg'
import BlackjackIcon from '@/assets/icons/blackjack.svg'

// Import social media icons
import TwitterIcon from 'vue-material-design-icons/Twitter.vue'
import DiscordIcon from 'vue-material-design-icons/Discord.vue'
import FacebookIcon from 'vue-material-design-icons/Facebook.vue'
import TelegramIcon from 'vue-material-design-icons/Telegram.vue'
import InstagramIcon from 'vue-material-design-icons/Instagram.vue'
import TikTokIcon from '@/assets/icons/tiktok.svg'
import TwitchIcon from 'vue-material-design-icons/Twitch.vue'
import RedditIcon from 'vue-material-design-icons/Reddit.vue'
import VKIcon from 'vue-material-design-icons/Vk.vue'

// Import flags
import en from '@/assets/icons/flags/en.svg'
import es from '@/assets/icons/flags/es.svg'
import ru from '@/assets/icons/flags/ru.svg'

// Import sounds
import { Howl } from 'howler'
import successSound from '@/assets/sounds/success.ogg'
import errorSound from '@/assets/sounds/error.ogg'



// Site
// --------------------------------------------------
Vue.prototype.$siteName = 'Bounty'
Vue.prototype.$siteDomain = 'Bounty.gg'
Vue.prototype.$langs = [
	{
		id: 'en',
		name: 'English',
		icon: en
	},
	{
		id: 'es',
		name: 'Español',
		icon: es
	},
	{
		id: 'ru',
		name: 'Русский',
		icon: ru
	}
]
Vue.prototype.$countupOptions = {
	duration: 1,
	useEasing: true,
	useGrouping: true,
	decimalPlaces: 2,
	prefix: '',
	suffix: ''
}



// Company
// --------------------------------------------------
Vue.prototype.$companyName = ''
Vue.prototype.$companyYearFounded = 2018
Vue.prototype.$companyNumber = ''
Vue.prototype.$companyOffice = ''
Vue.prototype.$license = ''



// Support
// --------------------------------------------------
Vue.prototype.$supportEmail = 'support@bounty.gg'
Vue.prototype.$helpdesk = 'https://help.bounty.gg/'



// Social Medias
// --------------------------------------------------
Vue.prototype.$socialMedias = {
	twitter: {
		name: 'Twitter',
		link: 'https://twitter.com/BountyGG',
		icon: TwitterIcon
	},
	discord: {
		name: 'Discord',
		link: 'https://discordapp.com/invite/hezAARK',
		icon: DiscordIcon
	},
	facebook: {
		name: 'Facebook',
		link: 'https://www.facebook.com/bountygg',
		icon: FacebookIcon
	},
	telegram: {
		name: 'Telegram',
		link: 'https://t.me/bountygg',
		icon: TelegramIcon
	},
	instagram: {
		name: 'Instagram',
		link: 'https://www.instagram.com/Bountydotgg',
		icon: InstagramIcon
	},
	tiktok: {
		name: 'TikTok',
		link: 'https://www.tiktok.com/@bountygg',
		icon: TikTokIcon
	},
	twitch: {
		name: 'Twitch',
		link: 'https://www.twitch.tv/bountydotgg',
		icon: TwitchIcon
	},
	reddit: {
		name: 'Reddit',
		link: 'https://www.reddit.com/r/bountygg',
		icon: RedditIcon
	},
	vk: {
		name: 'VK',
		link: 'https://vk.com/bountydotgg',
		icon: VKIcon
	}
}



// Games
// --------------------------------------------------
export const games = [
	{
		id: 'roulette',
		name: 'Roulette',
		i18nKey: 'pages.roulette.name',
		path: '/',
		fullPath: '/',
		icon: RouletteIcon,
		isGame: true,
		enabled: true // dont disable first game, will look into this later on
	},
	{
		id: 'raffles',
		name: 'Raffles',
		i18nKey: 'pages.raffles.name',
		path: '/raffles',
		fullPath: '/raffles/:id?',
		icon: RafflesIcon,
		isGame: true,
		enabled: true
	},
	{
		id: 'blackjack',
		name: 'Blackjack',
		i18nKey: 'pages.blackjack.name',
		path: '/blackjack',
		fullPath: '/blackjack',
		icon: BlackjackIcon,
		isGame: true,
		enabled: false
	}
]

Vue.prototype.$games = games



// Breakpoints
// --------------------------------------------------
Vue.prototype.$breakpoint = {
	sm: Number(scssVariables.breakpointSM.replace('px', '')),
	md: Number(scssVariables.breakpointMD.replace('px', '')),
	lg: Number(scssVariables.breakpointLG.replace('px', '')),
	xl: Number(scssVariables.breakpointXL.replace('px', ''))
}



// Sounds
// --------------------------------------------------
Vue.prototype.$sounds = {
	// success
	success: new Howl({
		src: successSound,
		volume: 0.5
	}),
	// error
	error: new Howl({
		src: errorSound,
		volume: 0.5
	})
}

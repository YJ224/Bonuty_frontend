import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/i18n'
import store from '@/store'

// Import games
import { games } from '@/config'

// Vue.use
Vue.use(VueRouter)

// Define games
let gameRoutes = []

for (let i in games) {
	const game = games[i]

	if (game.enabled) {
		gameRoutes.push({
			path: game.fullPath,
			name: game.name,
			component: () => import(/* webpackChunkName: "[request]" */ `@/views/Games/${game.name}`)
		})
	}
}

// Define routes
const routes = [

	// Games
	...gameRoutes,

	// Other Pages
	{
		path: '/profile/:tab?/:category?',
		name: 'Profile',
		component: () => import(/* webpackChunkName: "profile" */ `@/views/Profile`),
		meta: {
			requiresAuth: true
		}
	},

	// Redirect missing pages
	{
		path: '*',
		redirect: '/'
	}
]

// Setup VueRouter
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// NProgress timeout (to prevent loading bar on loaded pages)
let nprogressTimeout = null

// Router before each
router.beforeEach((to, from, next) => {
	// Start NProgress
	nprogressTimeout = setTimeout(() => {
		router.app?.$nprogress?.start()
	}, 0)

	// Handle requiresAuth pages
	if (to.meta.requiresAuth && !store.state.user.authenticated) return next('/')

	// Set document title for pages
	document.title = `${Vue.prototype.$siteDomain} - ${i18n.t(`pages.${to.name.toLowerCase()}.name`)}`

	next()
})

router.afterEach((to, from) => {
	// Finish NProgress
	clearTimeout(nprogressTimeout)
	if (to.name !== 'Profile') router.app?.$nprogress?.done()

	// Scroll page to top when changing route
	if (from.name !== to.name) document.getElementById('site-scroll')?.scrollTo(0, 0)
})

export default router

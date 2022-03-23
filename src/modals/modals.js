// Import states
import LoadingComponent from './Loading'

// Component config
const config = {
	loading: LoadingComponent,
	delay: 0
}

// Define modals
export default [
	{
		id: 'auth',
		component: () => ({
			component: import(/* webpackChunkName: "modal:auth" */ './Auth'),
			...config
		}),
		width: 480, // max modal width
		height: 421 // expected height (for skeleton loader)
	},
	{
		id: 'raffle',
		component: () => ({
			component: import(/* webpackChunkName: "modal:raffle" */ './Raffle'),
			...config
		}),
		width: 400,
		height: 553
	}
]

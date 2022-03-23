// Import icons
import GiftIcon from '@/assets/icons/gift.svg'
import LevelsIcon from 'vue-material-design-icons/ArrowUpBoldHexagonOutline.vue'
import AffiliatesIcon from 'vue-material-design-icons/AccountMultiplePlus.vue'
import FairnessIcon from 'vue-material-design-icons/ScaleBalance.vue'

export default [
	{
		id: 'rewards',
		i18nKey: 'modals.rewards.name',
		to: '?modal=rewards',
		icon: GiftIcon,
		highlight: true
	},
	{
		id: 'levels',
		i18nKey: 'pages.levels.name',
		to: '/levels',
		icon: LevelsIcon
	},
	{
		id: 'affiliates',
		i18nKey: 'pages.affiliates.name',
		to: '/affiliates',
		icon: AffiliatesIcon
	},
	{
		id: 'fairness',
		i18nKey: 'pages.fairness.name',
		to: '/fairness',
		icon: FairnessIcon
	}
]

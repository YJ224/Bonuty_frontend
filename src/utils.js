import Vue from 'vue'

// Import utils
import $formatBalance from '@/utils/formatBalance'
import $formatUsername from '@/utils/formatUsername'
import $notify from '@/utils/notify'
import $popupCenter from '@/utils/popupCenter'
import $randomNumberBetween from '@/utils/randomNumberBetween'
import $sanitizeString from '@/utils/sanitizeString'
import $splitSkin from '@/utils/splitSkin'

Vue.mixin({
	methods: {
		$formatBalance,
		$formatUsername,
		$notify,
		$popupCenter,
		$randomNumberBetween,
		$sanitizeString,
		$splitSkin
	}
})

<template>
	<router-link to="/raffles/2314" class="raffle" :style="{ pointerEvents: loading ? 'none' : '' }">
		<Skeleton width="100%" height="341px" v-if="loading" />

		<template v-else>
			<div class="content g-fade-in">

				<!-- Top Stats -->
				<div class="top-stats">
					<div class="amount">
						<CoinsIcon />
						34.52
					</div>
					<div class="players">
						<span>+1</span>
						<Avatar :src="$store.state.user.avatar" size="40px" />
						<Avatar :src="$store.state.user.avatar" size="40px" />
						<Avatar :src="$store.state.user.avatar" size="40px" />
					</div>
				</div>

				<!-- Skin Img -->
				<div class="skin-img">
					<SkinBg size="68" />
					<img class="lazy-from-bottom" v-lazy="'https://steamcommunity-a.akamaihd.net/economy/image/class/730/2396156014/200fx125f'" alt="" />
				</div>

				<!-- Skin Info -->
				<div class="skin-info">
					<div class="name">{{ $splitSkin('csgo', 'item', 'AK-47 | Arctic Ops (Field-Tested)') }} | {{ $splitSkin('csgo', 'name', 'AK-47 | Arctic Ops (Field-Tested)') }}</div>
					<div class="wear">{{ $splitSkin('csgo', 'wear', 'AK-47 | Arctic Ops (Field-Tested)') }}</div>
				</div>

				<!-- Middle Stats -->
				<div class="middle-stats">
					<div class="bar">
						<div :style="{ width: 60 + '%' }" />
					</div>
					<div class="info">
						<div class="state">Waiting</div>
						<div class="slots">3/5</div>
					</div>
				</div>

			</div>

			<!-- Button -->
			<Button color="primary g-fade-in" width="100%" height="52px">
				<i18n path="pages.raffles.quickJoin">
					<template v-slot:amount>
						<CoinsIcon fill="#fff" style="margin-left: 6px" />
						{{ $formatBalance(245) }}
					</template>
				</i18n>
			</Button>
		</template>

	</router-link>
</template>





<script>
// Import uikit
import Avatar from '@/uikit/Avatar'
import Button from '@/uikit/Button'
import Skeleton from '@/uikit/Skeleton'
import SkinBg from '@/uikit/SkinBg'

// Import icons
import CoinsIcon from '@/assets/icons/coins.svg'

export default {
	name: 'Raffle',

	// Props
	// --------------------------------------------------
	props: {
		raf: Object,
		loading: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Button,
		Skeleton,
		SkinBg,
		CoinsIcon
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

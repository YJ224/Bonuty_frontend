<template>
	<div class="card" :style="{ pointerEvents: loading ? 'none' : '' }">
		<div class="wrap">
			<Skeleton width="100%" height="100%" v-if="loading" />
			<div class="content g-fade-in" v-else>
				<div class="user">
					<Avatar :src="$store.state.user.avatar" size="34px" />
					<div class="username">Skymax</div>
				</div>
				<div class="amount won">
					+24.35
				</div>
			</div>
		</div>
	</div>
</template>





<script>
// Import uikit
import Avatar from '@/uikit/Avatar'
import Skeleton from '@/uikit/Skeleton'

export default {
	name: 'HistoryCard',

	// Props
	// --------------------------------------------------
	props: {
		loading: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		Avatar,
		Skeleton
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

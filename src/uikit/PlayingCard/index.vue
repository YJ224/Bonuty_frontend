<template>
	<div class="card">
		<div class="front">
			<div class="number">{{ number }}</div>
			<component :is="type" />
		</div>
		<div class="back">
			<Back />
		</div>
	</div>
</template>





<script>
// Import assets
import Back from '@/assets/blackjack/cards/back.svg'
import Clubs from '@/assets/blackjack/cards/clubs.svg'
import Diamonds from '@/assets/blackjack/cards/diamonds.svg'
import Hearts from '@/assets/blackjack/cards/hearts.svg'
import Spades from '@/assets/blackjack/cards/spades.svg'

export default {
	name: 'PlayingCard',

	// Props
	// --------------------------------------------------
	props: {
		type: String,
		number: Number
	},

	// Components
	// --------------------------------------------------
	components: {
		Back,
		Clubs,
		Diamonds,
		Hearts,
		Spades
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

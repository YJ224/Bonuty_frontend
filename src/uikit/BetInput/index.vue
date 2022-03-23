<template>
	<div class="bet-input" :style="{ maxWidth }">

		<input
			type="number"
			:value="value"
			@input="$emit('input', $event.target.value)"
			:placeholder="$t('uikit.betInput.placeholder')"
			min="0"
		/>

		<div class="buttons">
			<!-- Split -->
			<button v-if="splitBtn" @click="split">/2</button>
			<div class="line" v-if="splitBtn && doubleBtn" />
			<!-- Double -->
			<button v-if="doubleBtn" @click="double">x2</button>
			<!-- Clear -->
			<div class="line" v-if="doubleBtn && clearBtn" />
			<button v-if="clearBtn" @click="clear">
				<TrashIcon :size="18" />
			</button>
			<div class="line" v-if="clearBtn && maxBtn" />
			<!-- Max -->
			<button v-if="maxBtn" @click="max">{{ $t('uikit.betInput.buttons.max') }}</button>
		</div>

	</div>
</template>





<script>
// Import icons
import TrashIcon from 'vue-material-design-icons/TrashCanOutline.vue'

export default {
	name: 'BetInput',

	// Props
	// --------------------------------------------------
	props: {
		value: [String, Number],
		maxWidth: String,
		splitBtn: Boolean,
		doubleBtn: Boolean,
		clearBtn: Boolean,
		maxBtn: Boolean
	},

	// Components
	// --------------------------------------------------
	components: {
		TrashIcon
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * double()
		 */
		double() {
			let value = Number(this.value) * 100
			value *= 2
			value /= 100
			if (value <= 0) value = ''
			else value = Math.floor(value * 100) / 100

			this.$emit('input', value)
		},

		/**
		 * split()
		 */
		split() {
			let value = Number(this.value) * 100
			value /= 2
			value /= 100
			if (value <= 0) value = ''
			else value = Math.floor(value * 100) / 100

			this.$emit('input', value)
		},

		/**
		 * clear()
		 */
		clear() {
			this.$emit('input', '')
		},

		/**
		 * max()
		 */
		max() {
			this.$emit('input', '')
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

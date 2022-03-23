<template>
	<div class="bet-buttons">


		<template v-if="splitBtn && doubleBtn">
			<button @click="split">/2</button>

			<div class="line" />

			<button @click="double">x2</button>
		</template>


		<template v-else-if="clearBtn">
			<button @click="clear">
				<TrashIcon :size="18" />
			</button>
		</template>


		<template v-else>
			<button @click="add(0.5)">+0.5</button>

			<div class="line" />

			<button @click="add(1)">+1</button>

			<div class="line" />

			<button @click="add(2.5)">+2.5</button>

			<div class="line" />

			<button @click="add(5)">+5</button>

			<div class="line" />

			<button @click="add(10)">+10</button>

			<div class="line" />

			<button @click="add(25)">+25</button>

			<div class="line" />

			<button @click="add(50)">+50</button>

			<div class="line" />

			<button @click="add(100)">+100</button>
		</template>


	</div>
</template>





<script>
// Import icons
import TrashIcon from 'vue-material-design-icons/TrashCanOutline.vue'

export default {
	name: 'BetButtons',

	// Props
	// --------------------------------------------------
	props: {
		value: [String, Number],
		doubleBtn: Boolean,
		splitBtn: Boolean,
		clearBtn: Boolean
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
		 * add()
		 */
		add(amount) {
			amount *= 100
			let value = Number(this.value) * 100
			value += amount
			value /= 100
			if (value <= 0) value = ''
			else value = Math.floor(value * 100) / 100

			this.$emit('input', value)
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

<template>
	<v-popover offset="5" popoverClass="from-top select-popover" :open="isPopoverVisible" @show="openPopover" @hide="isPopoverVisible = false">

		<!-- Button -->
		<div ref="select" class="select" :class="{ active: isPopoverVisible }" :style="{ height }" :disabled="disabled || loading">
			<div class="label" v-if="label">{{ label }}</div>
			<component class="icon" :is="icon" v-if="icon" />
			<div class="value">{{ value.name }}</div>
			<DropdownArrow class="dropdown-icon" :size="20" />
		</div>

		<!-- Popover -->
		<template slot="popover">
			<div class="popover" :style="{ width: `${width}px` }">
				<div class="list">
					<div class="item" v-for="item in items" :key="item.id" @click="selectItem(item)" :class="{ selected: item.id === value.id }">
						<div class="icon" v-if="item.icon">
							<component :is="item.icon" :size="16" />
						</div>
						{{ item.name }}
					</div>
				</div>
			</div>
		</template>

	</v-popover>
</template>





<script>
import DropdownArrow from 'vue-material-design-icons/MenuDown.vue'

export default {
	name: 'Select',

	// Props
	// --------------------------------------------------
	props: {
		value: Object,
		items: Array,
		label: String,
		height: String,
		loading: [Boolean, String, Number, Function],
		disabled: [Boolean, String, Number, Function],
		icon: [Element, Object]
	},

	// Components
	// --------------------------------------------------
	components: {
		DropdownArrow
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			isPopoverVisible: false,
			width: 0
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * openPopover()
		 */
		openPopover() {
			if(this.disabled || this.loading) return

			this.isPopoverVisible = true
		},

		/**
		 * selectItem()
		 */
		selectItem(item) {
			this.$emit('input', item)
			this.isPopoverVisible = false
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		isPopoverVisible(visible) {
			if (!visible) return

			this.$nextTick(() => {
				this.width = this.$refs.select.clientWidth
			})
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		this.$nextTick(() => {
			this.width = this.$refs.select.clientWidth
		})
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

<template>
	<div class="commands-popover">
		<div
			@click="selectCommand(i)"
			class="command"
			v-for="(command, i) in filteredCommands"
			:key="command.command"
			:class="{ selected: selected === i}"
			@mouseenter="removeSelection"
		>
			<span class="icon">{{ command.icon }}</span>
			<span class="cmd">{{ command.command }} {{ $t(`layouts.chat.commands.${command.command}.placeholders`) }}</span>
			<span class="description">{{ $t(`layouts.chat.commands.${command.command}.description`) }}</span>
		</div>
	</div>
</template>





<script>
// Import commands
import commands from '../commands'

export default {
	name: 'CommandsPopover',

	// Props
	// --------------------------------------------------
	props: {
		value: String
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			selected: null,
			commands
		}
	},

	// Computed
	// --------------------------------------------------
	computed: {
		filteredCommands() {
			return this.commands.filter(e => e?.command.startsWith(this.value))
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * selectCommand()
		 */
		selectCommand(idx) {
			const selectedCommand = this.filteredCommands[idx]

			if (!selectedCommand?.command) return

			this.removeSelection()

			this.$emit('input', selectedCommand?.command + ' ')
		},

		/**
		 * nextIteme()
		 * - navigates through list
		 */
		nextItem(e) {
			if (this.selected === null || (this.selected > this.filteredCommands.length - 1)) this.selected = -1

			// Go up
			if (e.keyCode === 38 && this.selected > 0) {
				this.selected--

			// Go down
			} else if (e.keyCode === 40 && this.selected < this.filteredCommands.length - 1) {
				this.selected++

			// Go to end
			} else if (e.keyCode === 38 && (this.selected === 0 || this.selected === -1)) {
				this.selected = this.filteredCommands.length - 1

			// Go to start
			} else if (e.keyCode === 40 && this.selected === this.filteredCommands.length - 1) {
				this.selected = 0
			}

			// Selected
			if (e.key === 'Enter') {
				e.preventDefault()
				this.selectCommand(this.selected)
			}
		},

		/**
		 * removeSelection()
		 * - remove keys selection on hover
		 */
		removeSelection() {
			this.selected = null
		}
	},

	// Mounted
	// --------------------------------------------------
	mounted() {
		document.addEventListener('keydown', this.nextItem)
	},

	// Destroyed
	// --------------------------------------------------
	destroyed() {
		document.removeEventListener('keydown', this.nextItem)
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

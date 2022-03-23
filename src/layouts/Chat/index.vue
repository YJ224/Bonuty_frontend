<template>
	<aside class="chat">

		<!-- Header -->
		<div class="header">

			<div class="top">

				<!-- Channels -->
				<div class="channel-select">
					<v-popover offset="5" placement="bottom-start" popoverClass="from-top channels-popover" :open="channels.isPopoverVisible" @show="openChannelsPopover" @hide="channels.isPopoverVisible = false">

						<!-- Button -->
						<Button color="transparent" height="38px" padding="0 10px" :disabled="loading">
							<component class="flag" :is="channels.selected" />
							{{ $t(`site.languages.${channels.selected}`) }}
							<div class="dropdown-icon">
								<DropdownArrow :size="20" />
							</div>
						</Button>

						<!-- Popover -->
						<template slot="popover">
							<div class="channels-popover">
								<div @click="selectChannel(channel)" class="channel" v-for="channel in channels.list" :key="channel" :class="{ selected: channel === channels.selected }">
									<component class="flag" :is="channel" />
									{{ $t(`site.languages.${channel}`) }}
								</div>
							</div>
						</template>

					</v-popover>

				</div>

				<!-- Rain -->
				<router-link to="?modal=rain">
					<Button class="rain-btn" color="transparent" height="34px" padding="0 14px">
						<ICountUp
							:endVal="0"
							:options="rainAmountOptions"
						/>
						<RainIcon />
					</Button>
				</router-link>

			</div>

			<div class="bottom">
				<!-- Online -->
				<div class="online-users">
					<div class="pulsating-circle" />
					<span>42</span>
					{{ $t('layouts.chat.onlineUsers') }}
				</div>
				<!-- Close Chat -->
				<Button class="close-btn" color="transparent" width="28px" height="28px" @click="$store.commit('chat:close')">
					<ChatArrow :size="16" />
				</Button>
			</div>

		</div>

		<!-- Content -->
		<div class="container">
			<div class="wrapper">
				<div id="chat-scroll" class="content" @scroll="handleScroll">
					<transition-group class="wrap" tag="div" name="message">
						<Message v-for="msg in messages.slice(maxMsgs * -1)" :key="msg.id" :data="msg" />
					</transition-group>
				</div>
			</div>
			<div class="scroll-to-bottom-bg" v-if="autoScrollPaused"></div>
			<button @click="scrollToBottom('smooth')" class="scroll-to-bottom" v-if="autoScrollPaused">{{ $t('layouts.chat.scrollToBottom') }}</button>

			<!-- Commands Popover -->
				<transition name="popover-from-bottom">
					<CommandsPopover v-model="input" v-if="input.startsWith('/')" />
				</transition>
		</div>

		<!-- Footer -->
		<div class="footer">

			<div class="top">
				<textarea-autosize
					v-model="input"
					ref="chatInput"
					:placeholder="$t('layouts.chat.input')"
					:min-height="50"
					:max-height="109"
					rows="1"
					@keydown.native.prevent.enter="submitMessage"
					@keydown.native="handleInputKeydown"
				/>

				<!-- Emotes -->
				<Emotes v-model="input" />
			</div>

			<div class="bottom">
				<div class="left">
					<router-link to="?modal=chat-rules" v-tooltip="$t('modals.chatRules.name')">
						<Button color="transparent">
							<BookmarkIcon :size="18" />
						</Button>
					</router-link>
					<Button @click="toggleCommandsPopover" color="transparent" :class="{ active: input.startsWith('/') }" v-tooltip="$t('others.commands')">
						<SlashIcon :size="18" />
					</Button>
				</div>
				<div class="right">
					<Button @click="submitMessage" color="primary" padding="0 20px" fontSize="small" :disabled="!input || input === '/'" :loading="submitLoading">{{ $t('layouts.chat.sendBtn') }}</Button>
				</div>
			</div>

		</div>

	</aside>
</template>





<script>
// Import dependencies
import ICountUp from 'vue-countup-v2'

// Import components
const CommandsPopover = () => import(/* webpackChunkName: "chat:commands-popover" */ './CommandsPopover')
const Emotes = () => import(/* webpackChunkName: "chat:emotes" */ './Emotes')
import Message from './Message'

// Import uikit
import Button from '@/uikit/Button'

// Import icons
import BookmarkIcon from 'vue-material-design-icons/BookmarkMultiple.vue'
import SlashIcon from 'vue-material-design-icons/SlashForward.vue'
import ChatArrow from 'vue-material-design-icons/ArrowCollapseRight.vue'
import DropdownArrow from 'vue-material-design-icons/MenuDown.vue'
import RainIcon from '@/assets/icons/rain.svg'

// Import flags
import en from '@/assets/icons/flags/en.svg'
import es from '@/assets/icons/flags/es.svg'
import ru from '@/assets/icons/flags/ru.svg'

export default {
	name: 'ChatContent',

	// Components
	// --------------------------------------------------
	components: {
		ICountUp,
		CommandsPopover,
		Emotes,
		Message,
		Button,
		BookmarkIcon,
		SlashIcon,
		ChatArrow,
		DropdownArrow,
		RainIcon,

		// Flags
		en,
		es,
		ru
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			loading: false,

			// Channels
			channels: {
				isPopoverVisible: false,
				selected: 'en',
				list: ['en', 'ru', 'es']
			},

			// Messages
			autoScrollPaused: false,
			maxMsgs: 75, // Max amount of messages to render on DOM
			messages: [
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				},
				{
					id: Math.random().toString(16).slice(2),
					msg: 'Hello there :ramsay:',
					user: {
						username: 'Skymax'
					}
				}
			],

			// Input
			submitLoading: false,
			input: '',

			// Rain
			rainAmountOptions: {
				useEasing: true,
				useGrouping: true,
				decimalPlaces: 2,
				prefix: '',
				suffix: ''
			}
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * openChannelsPopover()
		 */
		openChannelsPopover() {
			if(this.loading) return

			this.channels.isPopoverVisible = true
		},

		/**
		 * selectChannel()
		 */
		selectChannel(channel) {
			this.channels.selected = channel
			this.channels.isPopoverVisible = false
		},

		/**
		 * submitMessage()
		 * - sends a message to chat
		 */
		submitMessage() {
			this.input = this.input.trim()

			// Prevent empty input
			if (!this.input) return this.input = ''

			// Prevent sending incomplete commands
			if (this.input === '/') return

			// Prevent manually sending GIFs
			if (this.input.startsWith('gif:')) return this.input = ''

			this.submitLoading = true

			// Get first message in list height before it's removed

			// Add new message
			this.messages.push({
				id: Math.random().toString(16).slice(2),
				msg: this.input,
				user: {
					username: 'Skymax'
				}
			})

			// Handle scroll
			if (!this.autoScrollPaused) this.scrollToBottom()

			this.input = ''
			this.submitLoading = false
		},

		/**
		 * handleScroll()
		 * - toggles autoScrollPaused
		 */
		handleScroll(e) {
			if ((e.target.scrollHeight - 180) - e.target.scrollTop <= e.target.clientHeight) {
				this.autoScrollPaused = false
			} else {
				this.autoScrollPaused = true
			}
		},

		/**
		 * scrollToBottom()
		 * - scrolls chat to bottom
		 */
		scrollToBottom(type) {
			const chatScroll = document.getElementById('chat-scroll')

			this.$nextTick(() => {
				if (type === 'smooth') {
					if ((chatScroll.scrollHeight >= 2000) && (chatScroll.scrollTop < (chatScroll.scrollHeight - 2000))) chatScroll.scrollTo(0, (chatScroll.scrollHeight - 2000))

					this.$nextTick(() => {
						chatScroll.scrollTo({
							top: 999999999999,
							behavior: 'smooth'
						})
					})
				} else {
					chatScroll.scrollTo(0, 999999999999)
				}
			})
		},

		/**
		 * toggleCommandsPopover()
		 */
		toggleCommandsPopover() {
			if (!this.input.startsWith('/')) return this.input = '/'

			return this.input = ''
		},

		/**
		 * handleInputKeydown()
		 */
		handleInputKeydown(e) {
			if (this.input.startsWith('/') && (e.which === 38 || e.which === 40)) {
				this.$refs.chatInput.$el.blur()
			}
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		input() {
			this.$refs.chatInput.$el.focus()
		}
	},

	mounted() {
		setTimeout(() => {
			this.scrollToBottom()
		}, 100);
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

<template>
	<div v-click-outside="closeEmotesPopover">
		<Button @click="toggleEmotesPopover" class="emote-btn" color="transparent">
			<EmojiIcon :size="20" />
		</Button>

		<!-- Emotes popover -->
		<transition name="popover-from-bottom">
			<div class="emotes-popover" v-if="isEmotesPopoverVisible">
				<div class="popover-header">
					<div class="btn" @click="changeEmotesTab('emotes')" :class="{ selected: emotesSelectedTab === 'emotes' }">
						<div class="btn-content">{{ $t('layouts.chat.emotes.emotes.name') }}</div>
					</div>
					<div class="btn" @click="changeEmotesTab('gifs')" :class="{ selected: emotesSelectedTab === 'gifs' }">
						<div class="btn-content">{{ $t('layouts.chat.emotes.gifs.name') }}</div>
					</div>
				</div>
				<div class="popover-body">
					<Input v-model="emotesSearch" :placeholder="$t(`layouts.chat.emotes.gifs.search`)" icon="search" height="42px" v-if="emotesSelectedTab === 'gifs'" />

					<div class="tab" :class="`tab-${emotesSelectedTab}`">
						<div class="tab-content">
							<!-- Emotes Tab -->
							<template v-if="emotesSelectedTab === 'emotes'">
								<div class="emotes">
									<div class="emote" @click="selectEmote(emote.key)" :class="{ selected: emote.key === selectedEmote.key }" v-for="emote in $store.state.chat.emotes" :key="emote.key" @mouseenter="mouseOverEmote(emote)">
										<img v-lazy="emote.src" alt="" />
									</div>
								</div>
							</template>
							<!-- GIFs Tab -->
							<template v-else>
								<!-- Not Loaded -->
								<Loader v-if="!gifs.length" />
								<!-- Loaded -->
								<div class="gifs" v-else>
									<!-- Columns -->
									<div class="column" v-for="column in 2" :key="column">
										<vue-aspect-ratio
											:ar="`135:${(gif.media[0].tinygif.dims[1] * 135) / gif.media[0].tinygif.dims[0]}`"
											v-for="(gif, i) in gifs"
											:key="gif.id"
											v-if="((column === 1) ? !(i & 1) : (i & 1)) && !(5 < gif.media[0].tinygif.dims[0] / gif.media[0].tinygif.dims[1] || gif.media[0].tinygif.dims[0] / gif.media[0].tinygif.dims[1] < 0.2)"
										>
											<div class="gif" @click="submitGIF(gif)">
												<Skeleton width="100%" height="100%" color="light" />
												<img v-lazy="gif.media[0].tinygif.url" alt="" />
											</div>
										</vue-aspect-ratio>
									</div>
								</div>
							</template>
						</div>
					</div>

				</div>
				<div class="emotes-overlay" v-if="emotesSelectedTab === 'emotes'">
					<img v-lazy="selectedEmote.src" alt="" />
					{{ `:${selectedEmote.key}:` }}
				</div>
			</div>
		</transition>

	</div>
</template>





<script>
// Import uikit
import Button from '@/uikit/Button'
import Input from '@/uikit/Input'
import Loader from '@/uikit/Loader'
import Skeleton from '@/uikit/Skeleton'

// Import icons
import EmojiIcon from 'vue-material-design-icons/EmoticonOutline.vue'

let searchTimeout = null

export default {
	name: 'Emotes',

	// Props
	// --------------------------------------------------
	props: {
		value: String
	},

	// Components
	// --------------------------------------------------
	components: {
		Button,
		Input,
		Loader,
		Skeleton,
		EmojiIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			// Emotes
			isEmotesPopoverVisible: false,
			emotesSelectedTab: 'emotes', // emotes or gifs
			selectedEmote: {
				key: 'sadcat',
				animated: false,
				src: 'https://cdn.discordapp.com/emojis/727126596171071569.png'
			},
			emotesSearch: '',
			gifs: []
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * toggleEmotesPopover()
		 */
		toggleEmotesPopover() {
			if (!this.isEmotesPopoverVisible && this.value.startsWith('/')) this.$emit('input', '')

			this.isEmotesPopoverVisible = !this.isEmotesPopoverVisible
		},

		/**
		 * closeEmotesPopover()
		 */
		closeEmotesPopover() {
			this.isEmotesPopoverVisible = false
		},

		/**
		 * changeEmotesTab()
		 */
		changeEmotesTab(tab) {
			this.emotesSelectedTab = tab
			this.emotesSearch = ''

			if (tab === 'gifs' && !this.gifs.length) this.getTrendingGIFs()
		},

		/**
		 * selectEmote()
		 */
		selectEmote(key) {
			let input = this.value
			input += ` :${key}:`
			input = input.trim()
			input += ' '

			this.$emit('input', input)

			this.isEmotesPopoverVisible = false
		},

		/**
		 * mouseOverEmote()
		 * - updates emotes overlay with selected emote info
		 */
		mouseOverEmote(emote) {
			this.selectedEmote = emote
		},

		/**
		 * getTrendingGIFs()
		 * - gets trending gifs from Tenor
		 */
		getTrendingGIFs() {
			const api = process.env.VUE_APP_TENOR_API
			const endpoint = 'https://g.tenor.com/v1/trending'
			const limit = 50
			const url = `${endpoint}?key=${api}&limit=${limit}`

			clearTimeout(searchTimeout)
			this.gifs = []
			fetch(url)
				.then(response => {
					return response.json()
				})
				.then(res => {
					this.gifs = res.results
				})
				.catch(err => {
					console.log(err)
				})
		},

		/**
		 * submitGIF()
		 */
		submitGIF(gif) {
			this.submitLoading = true

			const gifWidth = gif.media[0].tinygif.dims[0]
			const gifHeight = gif.media[0].tinygif.dims[1]
			const msg = `gif:${gifWidth}x${gifHeight}:${gif.media[0].tinygif.url.split('/')[4]}`

			this.$emit('input', msg)

			setTimeout(() => {
				this.submitLoading = false
			}, 400)

			this.isEmotesPopoverVisible = false
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		emotesSearch() {
			if (!this.emotesSearch) return this.getTrendingGIFs()

			const api = process.env.VUE_APP_TENOR_API
			const endpoint = 'https://g.tenor.com/v1/search'
			const limit = 50
			const url = `${endpoint}?key=${api}&q=${this.emotesSearch}&limit=${limit}`

			this.gifs = []

			clearTimeout(searchTimeout)

			searchTimeout = setTimeout(() => {
				fetch(url)
					.then(response => {
						return response.json()
					})
					.then(res => {
						this.gifs = res.results
					})
					.catch(err => {
						console.log(err)
					})
			}, 1000)
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

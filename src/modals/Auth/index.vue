<template>
	<div class="modal-inner">

		<!-- BG -->
		<img class="bg" v-lazy="require('@/assets/img/bounty-net.png')" alt="" />

		<!-- Skins Pack -->
		<img class="skins-pack" v-lazy="require('@/assets/img/skins-pack.png')" alt="" v-if="$route.query.tab !== '2FA'" />

		<!-- Logo -->
		<img class="logo" src="@/assets/logo.png" alt="" />

		<!-- Title -->
		<div class="title">{{ $t(`modals.auth.${$route.query.tab.replace('local-', '')}.name`) }}</div>

		<!-- Buttons -->
		<div class="buttons" v-if="!$route.query.tab.includes('local') && $route.query.tab !== '2FA'">
			<Button @click="authSteam" color="primary">
				<SteamIcon class="icon" :size="18" />
				{{ $t(`modals.auth.${$route.query.tab.replace('local-', '')}.with`, { method: 'Steam' }) }}
			</Button>
		</div>

		<!-- Or -->
		<div class="or" v-if="!$route.query.tab.includes('local') && $route.query.tab !== '2FA'">
			<div class="line" />
			<div class="text">{{ $t('modals.auth.or') }}</div>
			<div class="line" />
		</div>

		<!-- Other Methods -->
		<div key="other-methods" class="other-methods" v-if="!$route.query.tab.includes('local') && $route.query.tab !== '2FA'">
			<!-- Local -->
			<router-link :to="`?modal=auth&tab=local-${$route.query.tab.replace('local-', '')}`">
				<Button v-tooltip="'Username & Password'" color="secondary">
					<LocalIcon class="icon" :size="18" />
					Local
				</Button>
			</router-link>
			<!-- Google -->
			<Button @click="authGoogle" v-tooltip="'Google'" color="google" iconOnly>
				<GoogleIcon class="icon" :size="18" />
			</Button>
		</div>

		<!-- Local Login -->
		<div class="form" key="local-login" v-if="$route.query.tab === 'local-login'">
			<div class="input-group">
				<div class="label">{{ $t('modals.auth.login.inputs.1.label') }}</div>
				<Input v-model="form.username" :placeholder="$t('modals.auth.login.inputs.1.placeholder')" />
			</div>
			<div class="input-group">
				<div class="label">{{ $t('modals.auth.login.inputs.2.label') }}</div>
				<Input v-model="form.password" type="password" :placeholder="$t('modals.auth.login.inputs.2.placeholder')" />
			</div>
			<Button class="submit-btn" color="secondary">{{ $t('modals.auth.login.btn') }}</Button>
			<router-link class="forgot-btn" to="?modal=forgot-password">
				<Button color="transparent" height="42px">{{ $t('modals.auth.login.forgotBtn') }}</Button>
			</router-link>
		</div>

		<!-- Local Register -->
		<div class="form" key="local-register" v-else-if="$route.query.tab === 'local-register'">
			<div class="input-group">
				<div class="label">{{ $t('modals.auth.register.inputs.1.label') }}</div>
				<Input v-model="form.username" :placeholder="$t('modals.auth.register.inputs.1.placeholder')" />
			</div>
			<div class="input-group">
				<div class="label">{{ $t('modals.auth.register.inputs.2.label') }}</div>
				<Input v-model="form.email" type="email" :placeholder="$t('modals.auth.register.inputs.2.placeholder')" />
			</div>
			<div class="input-group">
				<div class="label">{{ $t('modals.auth.register.inputs.3.label') }}</div>
				<Input v-model="form.password" type="password" :placeholder="$t('modals.auth.register.inputs.3.placeholder')" />
			</div>
			<Button class="submit-btn" color="secondary">{{ $t('modals.auth.register.btn') }}</Button>
		</div>

		<!-- Local 2FA -->
		<div class="form" v-else-if="$route.query.tab === '2FA'">
			<CodeInput v-model="form.twoFactor" class="twofactor-input" @change="v => form.twoFactor = v" />
			<Button class="submit-btn" color="secondary" :disabled="form.twoFactor.length < 6">{{ $t('modals.auth.login.btn') }}</Button>
		</div>

		<!-- Terms -->
		<div class="terms" v-if="$route.query.tab !== '2FA'">{{ $t('modals.auth.terms') }}</div>
	</div>
</template>





<script>
// Import dependencies
import CodeInput from "vue-verification-code-input"

// Import uikit
import Button from '@/uikit/Button'
import Input from '@/uikit/Input'

// Import icons
import SteamIcon from 'vue-material-design-icons/Steam.vue'
import GoogleIcon from 'vue-material-design-icons/Google.vue'
import LocalIcon from 'vue-material-design-icons/KeyVariant.vue'

export default {
	name: 'Auth',

	// Components
	// --------------------------------------------------
	components: {
		CodeInput,
		Button,
		Input,
		SteamIcon,
		GoogleIcon,
		LocalIcon
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			availableTabs: ['login', 'local-login', 'register', 'local-register', '2FA'],
			form: {
				username: '',
				email: '',
				password: '',
				twoFactor: ''
			}
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		/**
		 * authSteam()
		 * - opens steam on a window to authenticate
		 */
		authSteam() {
			this.$popupCenter({url: `${process.env.VUE_APP_API_AUTH}/steam`, title: 'Steam', w: 900, h: 600})
		},

		/**
		 * authGoogle()
		 * - opens google on a window to authenticate
		 */
		authGoogle() {
			this.$popupCenter({url: `${process.env.VUE_APP_API_AUTH}/google`, title: 'Google', w: 450, h: 650})
		}
	},

	// Created
	// --------------------------------------------------
	created() {
		// Redirect to vaild tab if tab is invalid
		if (!this.availableTabs.includes(this.$route.query.tab)) {
			this.$router.push(`?modal=auth&tab=${this.availableTabs[0]}`)
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

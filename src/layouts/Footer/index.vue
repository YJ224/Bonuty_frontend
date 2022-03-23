<template>
	<div class="footer">

		<!-- Top -->
		<div class="top">
			<div class="content">

				<!-- Left -->
				<div class="left">

					<!-- Logo -->
					<div class="logo">
						<router-link to="/">
							<img src="@/assets/logo.png" alt="" />
						</router-link>
					</div>

					<!-- Slogan -->
					<div class="slogan">{{ $t('site.slogan') }}</div>

					<!-- Language Selector -->
					<Select class="lang-select" v-model="selectedLang" :icon="selectedLang.icon" :items="$langs" height="46px" />

				</div>

				<!-- Right -->
				<div class="right">

					<!-- Normal Column -->
					<div class="column" v-for="(col, i) in columns" :key="i + 1">
						<!-- Column Title -->
						<div class="title">{{ $t(`layouts.footer.columns.${i + 1}`) }}</div>

						<!-- Column Links -->
						<div class="links">
							<div class="link" v-for="link in col" :key="link.id">
								<router-link :to="link.to" v-if="link.to.startsWith('/') || link.to.startsWith('?')">
									{{ $t(link.i18nKey) || link.name }}
								</router-link>
								<a :href="link.to" target="_blank" rel="noopener noreferrer" v-else>
									{{ $t(link.i18nKey) || link.name }}
								</a>
							</div>
						</div>
					</div>

					<!-- Social Column -->
					<div class="column">
						<div class="title">{{ $t('layouts.footer.columns.social') }}</div>

						<div class="social-medias">
							<a class="social" target="_blank" rel="noopener noreferrer" v-for="(social, key) in $socialMedias" :key="key" :href="social.link">
								<component :is="social.icon" :class="`${key}-icon`" :size="20" />
							</a>
						</div>
					</div>

				</div>

			</div>
		</div>

		<!-- License (Middle) -->
		<div class="license" v-if="$license">
			<div class="content">
				<img src="https://betsmalta.com/assets/img/lisans.png" alt="" />
				Bounty is operated by Moonrail Limited B.V., Fransche Bloemweg 4, Curaçao (Company Registration No. 148182). A company licensed and regulated by the laws of Curaçao under license number 1668/JAZ.
	Payments may be handled on behalf of Moonrail Limited B.V. by JHOLT LTD, Voukourestiou, 25, NEPTUNE HOUSE, 1st floor, Flat/Office 11, 3045, Limassol, Cyprus (Company Registration No. HE393291) as per the agreement between the two companies.
			</div>
		</div>

		<!-- Bottom -->
		<div class="bottom">
			<div class="content">

				<!-- Left -->
				<div class="left">
					<div class="plus18">18+</div>
					{{ $t('site.copyright', { year: `${($companyYearFounded === new Date().getFullYear()) ? '' : `${$companyYearFounded}-`}${new Date().getFullYear()}`, siteDomain: $siteDomain }) }}
				</div>

				<!-- Right -->
				<div class="right">
					<div class="ping">
						<div class="pulsating-circle" :class="'low'" />
						<span>42</span>ms
					</div>
				</div>

			</div>
		</div>

	</div>
</template>





<script>
// Import uikit
import Select from '@/uikit/Select'

export default {
	name: 'Footer',

	// Components
	// --------------------------------------------------
	components: {
		Select
	},

	// Data
	// --------------------------------------------------
	data() {
		return {
			// Selected Language
			selectedLang: this.getSelectedLang(),

			// Columns
			columns: [
				[
					{
						id: 'fairness',
						i18nKey: 'pages.fairness.name',
						to: '/fairness'
					},
					{
						id: 'tos',
						i18nKey: 'pages.tos.name',
						to: '/terms-of-service'
					},
					{
						id: 'privacy',
						i18nKey: 'pages.privacyPolicy.name',
						to: '/privacy-policy'
					},
					{
						id: 'aml',
						i18nKey: 'pages.amlPolicy.name',
						to: '/aml-policy'
					},
					{
						id: 'refund',
						i18nKey: 'pages.refundPolicy.name',
						to: '/refund-policy'
					}
				],
				[
					{
						id: 'faq',
						i18nKey: 'pages.faq.short',
						to: '/faq'
					},
					{
						id: 'support',
						i18nKey: 'others.support',
						to: `https://help.${this.$siteDomain}/`
					},
					{
						id: 'status',
						i18nKey: 'others.serversStatus',
						to: `https://status.${this.$siteDomain}/`
					},
					{
						id: '',
						name: 'Trustpilot',
						to: `https://www.trustpilot.com/review/${this.$siteDomain.toLowerCase()}`
					}
				]
			]
		}
	},

	// Methods
	// --------------------------------------------------
	methods: {
		getSelectedLang() {
			return this.$langs.find(e => e.id === this.$i18n.locale)
		}
	},

	// Watch
	// --------------------------------------------------
	watch: {
		selectedLang(lang) {
			this.$i18n.locale = lang.id
			localStorage.setItem('lang', lang.id)
		}
	}
}
</script>





<style src="./styles.scss" lang="scss" scoped></style>

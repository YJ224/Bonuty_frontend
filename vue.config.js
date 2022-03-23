module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/styles/theme.scss";
				`
			}
		}
	},
	pluginOptions: {
		apollo: {
			lintGQL: true
		},
		i18n: {
			locale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
			fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
			localeDir: 'locales',
			enableInSFC: false
		}
	},
	transpileDependencies: ['vuex-persist'],
	chainWebpack: (config) => {
		// Disable prefetch
		config.plugins.delete('prefetch')

		// SVG loader
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
	}
}

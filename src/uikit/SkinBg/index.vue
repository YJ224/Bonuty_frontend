<template>
	<svg :style="{ transform: `scale(${size/78})` }" class="skin-bg" width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M36.5251 2.18198C37.892 0.815143 40.108 0.815145 41.4749 2.18198L75.818 36.5251C77.1849 37.892 77.1849 40.108 75.818 41.4749L41.4749 75.818C40.108 77.1849 37.892 77.1849 36.5251 75.818L2.18198 41.4749C0.815143 40.108 0.815145 37.892 2.18198 36.5251L36.5251 2.18198Z" fill="#313440"/>
		<path d="M36.5251 2.18198C37.892 0.815143 40.108 0.815145 41.4749 2.18198L75.818 36.5251C77.1849 37.892 77.1849 40.108 75.818 41.4749L41.4749 75.818C40.108 77.1849 37.892 77.1849 36.5251 75.818L2.18198 41.4749C0.815143 40.108 0.815145 37.892 2.18198 36.5251L36.5251 2.18198Z" fill="url(#paint0_linear)"/>
		<path d="M36.5251 2.18198C37.892 0.815143 40.108 0.815145 41.4749 2.18198L75.818 36.5251C77.1849 37.892 77.1849 40.108 75.818 41.4749L41.4749 75.818C40.108 77.1849 37.892 77.1849 36.5251 75.818L2.18198 41.4749C0.815143 40.108 0.815145 37.892 2.18198 36.5251L36.5251 2.18198Z" stroke="url(#paint1_linear)"/>
		<defs>
			<linearGradient id="paint0_linear" x1="39" y1="-1" x2="39" y2="79" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FF4E4E" stop-opacity="0"/>
				<stop offset="1" stop-color="#FF4E4E" stop-opacity="0.22"/>
			</linearGradient>
			<linearGradient id="paint1_linear" x1="39" y1="-1" x2="39" y2="79" gradientUnits="userSpaceOnUse">
				<stop stop-color="#FF4E4E" stop-opacity="0"/>
				<stop offset="1" stop-color="#FF4E4E"/>
			</linearGradient>
		</defs>
	</svg>
</template>





<script>
export default {
	name: 'SkinBg',

	// SkinBg
	// --------------------------------------------------
	props: {
		size: String
	}
}
</script>

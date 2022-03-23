export default function $sanitizeString(string) {
	const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'`': '&grave;',
			"/": '&#x2F;'
	}

	const reg = /[&<>"'/]/ig

	return string.replace(reg, (match)=>(map[match]))
}

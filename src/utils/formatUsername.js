export default function $formatUsername(username) {
	const regex = /([a-z0-9-]+\.){1,2}[a-z]{2,4}/ig

	return username.replace(regex, '*').trim()
}

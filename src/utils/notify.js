import Vue from 'vue'

import $sanitizeString from '@/utils/sanitizeString'

export default function $notify(type, text) {

	// Get notifications container
	const container = document.getElementById('notifications')

	// Create notification
	const noti = document.createElement('div')
	noti.classList.add('notification')
	noti.classList.add(`noti-${type}`)
	noti.innerHTML = `
		<div class="content">${$sanitizeString(text)}</div>
	`

	setTimeout(() => {
		noti.classList.add('noti-visible')
	}, 0)

	// Append notification to #notifications
	container.appendChild(noti)

	// Set clientHeight as variable (for animation purposes)
	noti.style.setProperty('--client-height', noti.clientHeight + 'px')

	// Play sound effect
	if (type === 'error') Vue.prototype.$sounds.error.play()
	else Vue.prototype.$sounds.success.play()

	// Dismiss on click
	noti.onclick = () => {
		removeNotification(noti)
	}

	// Remove notification after 5 seconds
	setTimeout(() => {
		removeNotification(noti)
	}, 5000)
}





function removeNotification(noti) {
	noti.classList.remove('noti-visible')

	setTimeout(() => {
		noti.remove()
	}, 200)
}

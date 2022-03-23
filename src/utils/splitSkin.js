export default function $splitSkin(game, type, item) {

	// CS:GO
	// --------------------------------------------------
	if (game === 'csgo') {
		// Item
		if (type === 'item') return item.split('|')[0].trim()
		// Name
		else if (type === 'name') return item.split('|')[1].split('(')[0].trim()
		// Wear
		else if (type === 'wear') return item.split('|')[1].split('(')[1].replace(')', '').trim()
	}
}

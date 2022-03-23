export default function $formatBalance(amount) {
	amount = Number(amount) / 100
	amount = amount.toFixed(2)
	amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

	return amount
}

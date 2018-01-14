const fs = require("fs")

const file = process.argv[2]
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const  freqbet = "etaoinshrdlcumwfgypbvkjxqz"
const downcase = true
const remove = [" ", "\n"]
const shift_amount = 0

const remove_regex = new RegExp(remove.join("|"), "g")

const preProcess = text => {
	if (downcase) text = text.toLowerCase()
	text = text.replace(remove_regex, "")
	return text
}

const shiftLetter = (l, amount) => {
	if (0 > alphabet.indexOf(l)) {
		return l
	}
	return alphabet[(alphabet.indexOf(l) + amount) % 26]
}

const shift = (text, amount) =>
	text.split("").map(l => shiftLetter(l, amount)).join("")

fs.readFile(file, "utf8", (err, contents) => {
	text = preProcess(contents)
	console.log("  " + freqbet.split("").join("  "))
	let freqs = new Map()
	for (let l of text) {
		freqs[l] |= 0
		freqs[l] += 1
	}
	freq_string = ""
	for (let l of freqbet) {
		freq_string += ("   " + freqs[l]).slice(-3)
	}
	console.log(freq_string)
	console.log()
	console.log(shift(text, shift_amount))
})

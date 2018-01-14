const fs = require("fs")
const file = process.argv[2]
const alphabet = "abcdefghijklmnopqrstuvwxyz"
const  freqbet = "etaoinshrdlcumwfgypbvkjxqz"
const downcase = true

const shiftLetter = (l, amount) => {
	if (0 > alphabet.indexOf(l)) {
		return l
	}
	return alphabet[(alphabet.indexOf(l) + amount) % 26]
}

const shift = (text, amount) => {
	stext = ""
	for (let l of text) {
		stext += shiftLetter(l, amount)
	}
	return stext
}

fs.readFile(file, "utf8", (err, contents) => {
	if (downcase) {
		text = contents.toLowerCase()
	} else {
		text = contents
	}
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
	console.log(shift(text, 0))
})

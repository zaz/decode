const fs = require("fs")
const wordListPath = require("word-list")

const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n")
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

const wordsIn = text =>
	wordArray.filter(word => text.indexOf(word) >= 0)
	         .sort((a, b) => b.length - a.length)

const splitByWords = text => {
	let words = wordsIn(text)
	let longest_word = words[0]
	if (!longest_word) return text
	let sections = text.split(longest_word)
	let spaced = sections.map(splitByWords).join(" " + longest_word + " ")
	return spaced
}

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
		freq_string += ("   " + (freqs[l] || 0)).slice(-3)
	}
	console.log(freq_string)
	console.log()
	console.log(shift(text, shift_amount))
	console.log()
	console.log( splitByWords(shift(text, shift_amount)) )
})

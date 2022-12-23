import { allWords } from './data/words.js'

export namespace Dictionary {
	let words: string[] = []

	export function getWord(idx: number): string {
		return words[idx]
	}

	export function getWordCount(): number {
		return words.length
	}

	export function loadRandomWords(count: number) {
		words = []
		while (count-- > 0) words.push(allWords[Math.floor(Math.random() * allWords.length)])
	}
}

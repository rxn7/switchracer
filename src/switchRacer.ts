import { Caret } from './caret.js'
import { Dictionary } from './dictionary.js'
import { Letter, LetterStatus } from './letter.js'
import { Stats } from './stats.js'
import { TryAgainButton } from './tryAgainButton.js'
import { TypingArea } from './typingArea.js'

export namespace Switchracer {
	const wordCount: number = 20

	enum GameStatus {
		FINISH,
		READY,
		TYPING,
	}

	let startTime: Date
	let letters: Letter[] = []
	let currentLetter: Letter
	let cursorPosition: number = 0
	let status: GameStatus

	window.addEventListener('keydown', ev => {
		ev.preventDefault()

		switch (ev.key) {
			case 'Backspace':
				if (status !== GameStatus.TYPING) break

				if (ev.ctrlKey) deleteWholeWord()
				else if (cursorPosition > 0) deleteCurrentLetter()

				break

			default:
				if (ev.key.length !== 1) break

				if (status === GameStatus.READY) onTypingStarted()

				if (ev.key === currentLetter.value) currentLetter.setStatus(LetterStatus.CORRECT)
				else currentLetter.setStatus(LetterStatus.INCORRECT)

				if (cursorPosition++ == letters.length - 1) onFinish()
				break
		}

		if (status === GameStatus.TYPING) setCurrentLetter(letters[cursorPosition])
	})

	function deleteWholeWord(): void {
		let i = 0
		while (cursorPosition > 0 && (i == 0 || letters[cursorPosition - 1].value != ' ')) {
			letters[--cursorPosition].element.className = 'letter-default'
			++i
		}
	}

	function deleteCurrentLetter(): void {
		letters[--cursorPosition].element.className = 'letter-default'
	}

	function onTypingStarted(): void {
		status = GameStatus.TYPING
		startTime = new Date()
	}

	function onFinish(): void {
		status = GameStatus.FINISH

		const characterCount: number = letters.filter(x => x.status === LetterStatus.CORRECT).length

		const now: Date = new Date()
		const millisecondsPassed: number = +now - +startTime
		const minutesPassed: number = millisecondsPassed / 1000 / 60

		const cpm: number = characterCount / minutesPassed
		const wpm: number = cpm / 5

		Stats.show(wpm, cpm, wordCount, letters, millisecondsPassed)
		Caret.hide()
		TypingArea.hide()
		TryAgainButton.show()
	}

	function setCurrentLetter(letter: Letter): void {
		currentLetter = letter
		Caret.moveToLetter(letter)
	}

	export function restart(): void {
		Stats.hide()
		TryAgainButton.hide()
		Caret.show()
		TypingArea.show()

		status = GameStatus.READY
		letters.forEach(letter => letter.destroy())
		letters = []

		Dictionary.loadRandomWords(wordCount)

		for (let i = 0; i < Dictionary.getWordCount(); ++i) {
			const word: string = Dictionary.getWord(i)
			for (let j = 0; j < word.length; ++j) {
				letters.push(new Letter(word[j]))

				if (j === word.length - 1 && i !== Dictionary.getWordCount() - 1) letters.push(new Letter(' '))
			}
		}

		cursorPosition = 0
		setCurrentLetter(letters[0])
	}

	restart()
}

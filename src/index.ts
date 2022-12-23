import { Caret } from './caret.js'
import { Dictionary } from './dictionary.js'
import { Letter, LetterStatus } from './letter.js'
import { Stats } from './stats.js'

export const wordContainerElement: HTMLDivElement = document.getElementById('word-container') as HTMLDivElement
export const tryAgainBtnElement: HTMLButtonElement = document.getElementById('try-again-btn') as HTMLButtonElement

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
			if (status === GameStatus.TYPING) {
				if (ev.ctrlKey) {
					let i = 0
					while (cursorPosition > 0 && (i == 0 || letters[cursorPosition - 1].value != ' ')) {
						letters[--cursorPosition].element.className = 'letter-default'
						++i
					}
				} else if (cursorPosition > 0) {
					letters[--cursorPosition].element.className = 'letter-default'
				}
			}

			break
		default:
			if (ev.key.length !== 1) break

			if (status === GameStatus.READY) onTypingStarted()

			if (ev.key === currentLetter.value) {
				currentLetter.setStatus(LetterStatus.CORRECT)
			} else {
				currentLetter.setStatus(LetterStatus.INCORRECT)
			}

			if (cursorPosition++ == letters.length - 1) onFinish()

			break
	}

	if (status === GameStatus.TYPING) setCurrentLetter(letters[cursorPosition])
})

function onTypingStarted(): void {
	status = GameStatus.TYPING
	Stats.hide()
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
	tryAgainBtnElement.style.display = 'block'
}

function setCurrentLetter(letter: Letter): void {
	currentLetter = letter
	Caret.moveToLetter(letter, wordContainerElement)
}

function restart(): void {
	Caret.show()
	tryAgainBtnElement.style.display = 'none'

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

tryAgainBtnElement.addEventListener('click', () => {
	restart()
})

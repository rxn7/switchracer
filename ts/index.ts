import { Dictionary } from './dictionary.js';
import { Letter } from './letter.js';

export const wordContainerElement: HTMLDivElement = document.getElementById('word-container') as HTMLDivElement;
const caretElement: HTMLDivElement = document.getElementById('caret') as HTMLDivElement;
const wordCount: number = 30;

let dictionary: Dictionary = new Dictionary();
let letters: Letter[] = [];
let currentLetter: Letter;
let cursorPosition = 0;

window.addEventListener('keydown', ev => {
	ev.preventDefault();

	switch(ev.key) {
		case 'Backspace':
			if(cursorPosition > 0) {
				letters[--cursorPosition].element.className = "letter-default";
			}

			break;
		default:
			if(ev.key.length == 1) {
				currentLetter.element.className = ev.key == currentLetter.value ? 'letter-correct' : 'letter-incorrent';
				cursorPosition++;
			}

			break;
	}

	SetCurrentLetter(letters[cursorPosition]);

	if(cursorPosition == letters.length-1) {
		InitChallenge();
	}
});

function SetCurrentLetter(letter: Letter): void {
	currentLetter = letter;

	let letterRect: DOMRect = letter.element.getBoundingClientRect();
	let wordContainerRect: DOMRect = wordContainerElement.getBoundingClientRect();

	caretElement.style.left = `${letterRect.left - wordContainerRect.left - 1.5}px`;
	caretElement.style.top = `${letterRect.top - wordContainerRect.top}px`;
	caretElement.style.height = `${letterRect.height}px`;
}

function InitChallenge(): void {
	letters.forEach(letter => {
		letter.element.parentElement?.removeChild(letter.element);
	});

	letters = [];
	let challengeWords: string[] = dictionary.GetRandomWords(wordCount);

	for(let i=0; i<challengeWords.length; ++i) {
		for(let j=0; j<challengeWords[i].length; ++j) {
			letters.push(new Letter(challengeWords[i][j]));

			if(j == challengeWords[i].length-1) {
				letters.push(new Letter(' '));
			}
		}
	}

	cursorPosition = 0;
	SetCurrentLetter(letters[0]);
}

dictionary.LoadWords().then(() => {
	InitChallenge();
});

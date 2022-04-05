import { Dictionary } from './dictionary.js';
import { Letter } from './letter.js';
export const wordContainerElement = document.getElementById('word-container');
const caretElement = document.getElementById('caret');
const wordCount = 30;
let dictionary = new Dictionary();
let letters = [];
let currentLetter;
let cursorPosition = 0;
window.addEventListener('keydown', ev => {
    switch (ev.key) {
        case 'Backspace':
            if (cursorPosition > 0) {
                letters[--cursorPosition].element.className = "letter-default";
            }
            break;
        case 'Space':
            cursorPosition++;
            break;
        default:
            if (ev.key.length == 1) {
                currentLetter.element.className = ev.key == currentLetter.value ? 'letter-correct' : 'letter-incorrent';
                cursorPosition++;
            }
            break;
    }
    SetCurrentLetter(letters[cursorPosition]);
    if (cursorPosition == letters.length - 1) {
        InitChallenge();
    }
});
function SetCurrentLetter(letter) {
    currentLetter = letter;
    let letterRect = letter.element.getBoundingClientRect();
    let wordContainerRect = wordContainerElement.getBoundingClientRect();
    caretElement.style.left = `${letterRect.left - wordContainerRect.left}px`;
    caretElement.style.top = `${letterRect.top - wordContainerRect.top}px`;
    caretElement.style.height = `${letterRect.height}px`;
}
function InitChallenge() {
    letters.forEach(letter => {
        var _a;
        (_a = letter.element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(letter.element);
    });
    letters = [];
    let challengeWords = dictionary.GetWords(wordCount);
    for (let i = 0; i < challengeWords.length; ++i) {
        for (let j = 0; j < challengeWords[i].length; ++j) {
            letters.push(new Letter(challengeWords[i][j]));
            if (j == challengeWords[i].length - 1) {
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

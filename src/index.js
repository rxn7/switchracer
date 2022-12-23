import { Caret } from './caret.js';
import { Dictionary } from './dictionary.js';
import { Letter, LetterStatus } from './letter.js';
import { Stats } from './stats.js';
export const wordContainerElement = document.getElementById('word-container');
export const tryAgainBtnElement = document.getElementById('try-again-btn');
const wordCount = 20;
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["FINISH"] = 0] = "FINISH";
    GameStatus[GameStatus["READY"] = 1] = "READY";
    GameStatus[GameStatus["TYPING"] = 2] = "TYPING";
})(GameStatus || (GameStatus = {}));
let startTime;
let letters = [];
let currentLetter;
let cursorPosition = 0;
let status;
window.addEventListener('keydown', ev => {
    ev.preventDefault();
    switch (ev.key) {
        case 'Backspace':
            if (status === GameStatus.TYPING) {
                if (ev.ctrlKey) {
                    let i = 0;
                    while (cursorPosition > 0 && (i == 0 || letters[cursorPosition - 1].value != ' ')) {
                        letters[--cursorPosition].element.className = 'letter-default';
                        ++i;
                    }
                }
                else if (cursorPosition > 0) {
                    letters[--cursorPosition].element.className = 'letter-default';
                }
            }
            break;
        default:
            if (ev.key.length !== 1)
                break;
            if (status === GameStatus.READY)
                onTypingStarted();
            if (ev.key === currentLetter.value) {
                currentLetter.setStatus(LetterStatus.CORRECT);
            }
            else {
                currentLetter.setStatus(LetterStatus.INCORRECT);
            }
            if (cursorPosition++ == letters.length - 1)
                onFinish();
            break;
    }
    if (status === GameStatus.TYPING)
        setCurrentLetter(letters[cursorPosition]);
});
function onTypingStarted() {
    status = GameStatus.TYPING;
    Stats.hide();
    startTime = new Date();
}
function onFinish() {
    status = GameStatus.FINISH;
    const characterCount = letters.filter(x => x.status === LetterStatus.CORRECT).length;
    const now = new Date();
    const millisecondsPassed = +now - +startTime;
    const minutesPassed = millisecondsPassed / 1000 / 60;
    const cpm = characterCount / minutesPassed;
    const wpm = cpm / 5;
    Stats.show(wpm, cpm, wordCount, letters, millisecondsPassed);
    Caret.hide();
    tryAgainBtnElement.style.display = 'block';
}
function setCurrentLetter(letter) {
    currentLetter = letter;
    Caret.moveToLetter(letter, wordContainerElement);
}
function restart() {
    Caret.show();
    tryAgainBtnElement.style.display = 'none';
    status = GameStatus.READY;
    letters.forEach(letter => letter.destroy());
    letters = [];
    Dictionary.loadRandomWords(wordCount);
    for (let i = 0; i < Dictionary.getWordCount(); ++i) {
        const word = Dictionary.getWord(i);
        for (let j = 0; j < word.length; ++j) {
            letters.push(new Letter(word[j]));
            if (j === word.length - 1 && i !== Dictionary.getWordCount() - 1)
                letters.push(new Letter(' '));
        }
    }
    cursorPosition = 0;
    setCurrentLetter(letters[0]);
}
restart();
tryAgainBtnElement.addEventListener('click', () => {
    restart();
});

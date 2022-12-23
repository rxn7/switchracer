import { Caret } from './caret.js';
import { Dictionary } from './dictionary.js';
import { Letter, LetterStatus } from './letter.js';
import { Stats } from './stats.js';
import { TryAgainButton } from './tryAgainButton.js';
import { TypingArea } from './typingArea.js';
export var Switchracer;
(function (Switchracer) {
    const wordCount = 20;
    let GameStatus;
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
                if (status !== GameStatus.TYPING)
                    break;
                if (ev.ctrlKey)
                    deleteWholeWord();
                else if (cursorPosition > 0)
                    deleteCurrentLetter();
                break;
            default:
                if (ev.key.length !== 1)
                    break;
                if (status === GameStatus.READY)
                    onTypingStarted();
                if (ev.key === currentLetter.value)
                    currentLetter.setStatus(LetterStatus.CORRECT);
                else
                    currentLetter.setStatus(LetterStatus.INCORRECT);
                if (cursorPosition++ == letters.length - 1)
                    onFinish();
                break;
        }
        if (status === GameStatus.TYPING)
            setCurrentLetter(letters[cursorPosition]);
    });
    function deleteWholeWord() {
        let i = 0;
        while (cursorPosition > 0 && (i == 0 || letters[cursorPosition - 1].value != ' ')) {
            letters[--cursorPosition].element.className = 'letter-default';
            ++i;
        }
    }
    function deleteCurrentLetter() {
        letters[--cursorPosition].element.className = 'letter-default';
    }
    function onTypingStarted() {
        status = GameStatus.TYPING;
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
        TypingArea.hide();
        TryAgainButton.show();
    }
    function setCurrentLetter(letter) {
        currentLetter = letter;
        Caret.moveToLetter(letter);
    }
    function restart() {
        Stats.hide();
        TryAgainButton.hide();
        Caret.show();
        TypingArea.show();
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
    Switchracer.restart = restart;
    restart();
})(Switchracer || (Switchracer = {}));

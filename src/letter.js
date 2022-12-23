import { TypingArea } from './typingArea.js';
export var LetterStatus;
(function (LetterStatus) {
    LetterStatus[LetterStatus["DEFAULT"] = 0] = "DEFAULT";
    LetterStatus[LetterStatus["CORRECT"] = 1] = "CORRECT";
    LetterStatus[LetterStatus["INCORRECT"] = 2] = "INCORRECT";
})(LetterStatus || (LetterStatus = {}));
export class Letter {
    constructor(value) {
        this.status = LetterStatus.DEFAULT;
        this.value = value;
        this.element = document.createElement('pre');
        this.element.textContent = value;
        this.element.classList.add('letter');
        this.element.classList.add('letter-default');
        TypingArea.wordContainerElement.appendChild(this.element);
    }
    destroy() {
        this.element.parentElement?.removeChild(this.element);
    }
    setStatus(status) {
        this.status = status;
        switch (this.status) {
            case LetterStatus.DEFAULT:
                this.element.className = 'letter letter-default';
                break;
            case LetterStatus.CORRECT:
                this.element.className = 'letter letter-correct';
                break;
            case LetterStatus.INCORRECT:
                this.element.className = 'letter letter-incorrect';
                break;
        }
    }
}

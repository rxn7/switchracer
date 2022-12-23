import { TypingArea } from './typingArea.js';
export var Caret;
(function (Caret) {
    const caretElement = document.getElementById('caret');
    function hide() {
        caretElement.style.display = 'none';
    }
    Caret.hide = hide;
    function show() {
        caretElement.style.display = 'block';
    }
    Caret.show = show;
    function moveToLetter(letter) {
        let letterRect = letter.element.getBoundingClientRect();
        let wordContainerRect = TypingArea.wordContainerElement.getBoundingClientRect();
        caretElement.style.left = `${letterRect.left - wordContainerRect.left - 1.5}px`;
        caretElement.style.top = `${letterRect.top - wordContainerRect.top}px`;
        caretElement.style.height = `${letterRect.height}px`;
    }
    Caret.moveToLetter = moveToLetter;
})(Caret || (Caret = {}));

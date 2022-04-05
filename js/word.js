const wordContainerElement = document.getElementById('word-container');
export class Word {
    constructor(text) {
        this.letterElements = [];
        this.text = text;
        this.element = document.createElement('div');
        this.element.classList.add('word');
        for (let i = 0; i < text.length; ++i) {
            this.letterElements[i] = document.createElement('span');
            this.letterElements[i].textContent = text[i];
            this.letterElements[i].classList.add('letter-default');
            this.element.appendChild(this.letterElements[i]);
        }
        wordContainerElement.appendChild(this.element);
    }
}

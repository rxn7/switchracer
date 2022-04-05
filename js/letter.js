import { wordContainerElement } from './index.js';
export class Letter {
    constructor(value) {
        this.value = value;
        this.element = document.createElement('span');
        this.element.textContent = value;
        this.element.classList.add('letter');
        this.element.classList.add('letter-default');
        wordContainerElement.appendChild(this.element);
    }
}

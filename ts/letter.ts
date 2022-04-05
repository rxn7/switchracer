import { wordContainerElement } from './index.js';

export class Letter {
	public element: HTMLSpanElement;
	public value: string;

	public constructor(value: string) {
		this.value = value
		this.element = document.createElement('span');
		this.element.textContent = value;
		this.element.classList.add('letter');
		this.element.classList.add('letter-default');

		wordContainerElement.appendChild(this.element);
	}
}

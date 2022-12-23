import { wordContainerElement } from './index.js'

export enum LetterStatus {
	DEFAULT,
	CORRECT,
	INCORRECT,
}

export class Letter {
	public element: HTMLSpanElement
	public value: string
	public status: LetterStatus

	public constructor(value: string) {
		this.status = LetterStatus.DEFAULT
		this.value = value
		this.element = document.createElement('pre')
		this.element.textContent = value
		this.element.classList.add('letter')
		this.element.classList.add('letter-default')

		wordContainerElement.appendChild(this.element)
	}

	public destroy(): void {
		this.element.parentElement?.removeChild(this.element)
	}

	public setStatus(status: LetterStatus): void {
		this.status = status
		switch (this.status) {
			case LetterStatus.DEFAULT:
				this.element.className = 'letter letter-default'
				break

			case LetterStatus.CORRECT:
				this.element.className = 'letter letter-correct'
				break

			case LetterStatus.INCORRECT:
				this.element.className = 'letter letter-incorrect'
				break
		}
	}
}

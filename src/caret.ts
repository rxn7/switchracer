import { Letter } from './letter'

export namespace Caret {
	const caretElement: HTMLDivElement = document.getElementById('caret') as HTMLDivElement

	export function hide(): void {
		caretElement.style.display = 'none'
	}

	export function show(): void {
		caretElement.style.display = 'block'
	}

	export function moveToLetter(letter: Letter, wordContainerElement: HTMLDivElement): void {
		let letterRect: DOMRect = letter.element.getBoundingClientRect()
		let wordContainerRect: DOMRect = wordContainerElement.getBoundingClientRect()

		caretElement.style.left = `${letterRect.left - wordContainerRect.left - 1.5}px`
		caretElement.style.top = `${letterRect.top - wordContainerRect.top}px`
		caretElement.style.height = `${letterRect.height}px`
	}
}

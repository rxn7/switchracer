export namespace TypingArea {
	export const wordContainerElement: HTMLDivElement = document.getElementById('word-container') as HTMLDivElement

	export function hide(): void {
		wordContainerElement.style.display = 'none'
	}

	export function show(): void {
		wordContainerElement.style.display = 'block'
	}
}

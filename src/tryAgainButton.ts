import { Switchracer as SwitchRacer } from './switchRacer.js'

export namespace TryAgainButton {
	const tryAgainBtnElement: HTMLButtonElement = document.getElementById('try-again-btn') as HTMLButtonElement

	export function hide(): void {
		tryAgainBtnElement.style.display = 'none'
	}

	export function show(): void {
		tryAgainBtnElement.style.display = 'block'
	}

	tryAgainBtnElement.addEventListener('click', () => {
		SwitchRacer.restart()
	})
}

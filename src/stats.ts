import { Letter, LetterStatus } from './letter.js'
import { TimeHelper } from './timeHelper.js'

export namespace Stats {
	const statsElement: HTMLParagraphElement = document.getElementById('stats') as HTMLParagraphElement

	export function show(wpm: number, cpm: number, wordCount: number, letters: Letter[], millisecondsPassed: number): void {
		statsElement.style.display = 'block'

		const correctLetterCount: number = letters.filter(l => l.status === LetterStatus.CORRECT).length
		const accuracyPercent: number = (correctLetterCount / letters.length) * 100
		const timeStr: string = TimeHelper.millisecondsToHumanReadableTime(millisecondsPassed)

		statsElement.innerHTML = `Time: ${timeStr}<br>`
		statsElement.innerHTML += `WPM: ${wpm | 0}, CPM: ${cpm | 0}<br>`
		statsElement.innerHTML += `Accuracy: ${accuracyPercent.toFixed(2)}%, ${correctLetterCount | 0}/${letters.length}<br>`
		statsElement.innerHTML += `Words: ${wordCount | 0}`
	}

	export function hide(): void {
		statsElement.style.display = 'none'
	}
}

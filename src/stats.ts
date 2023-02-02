import { Letter, LetterStatus } from './letter.js'
import { TimeHelper } from './timeHelper.js'

export namespace Stats {
	export type Props = {
		wpm: number
		cpm: number
		correctLetterCount: number
		accuracyPercent: number
		wordCount: number
		letters: Letter[]
		millisecondsPassed: number
	}

	const statsElement: HTMLParagraphElement = document.getElementById('stats') as HTMLParagraphElement

	export function show(props: Props): void {
		statsElement.style.display = 'block'

		const timeStr: string = TimeHelper.millisecondsToHumanReadableTime(props.millisecondsPassed)

		statsElement.innerHTML = `Time: ${timeStr}<br>`
		statsElement.innerHTML += `WPM: ${props.wpm | 0}, CPM: ${props.cpm | 0}<br>`
		statsElement.innerHTML += `Accuracy: ${props.accuracyPercent.toFixed(2)}%, ${props.correctLetterCount | 0}/${props.letters.length}<br>`
		statsElement.innerHTML += `Words: ${props.wordCount | 0}`
	}

	export function hide(): void {
		statsElement.style.display = 'none'
	}
}

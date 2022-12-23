export namespace TimeHelper {
	export function millisecondsToHumanReadableTime(milliseconds: number): string {
		let timeStr: string = ''

		const date: Date = new Date(milliseconds)
		if (date.getUTCHours() !== 0) timeStr += date.getUTCHours() + 'h '
		if (date.getUTCMinutes() !== 0) timeStr += date.getUTCMinutes() + 'm '
		if (date.getUTCSeconds() !== 0) timeStr += date.getUTCSeconds() + 's '
		timeStr += date.getUTCMilliseconds() + 'ms'

		return timeStr
	}
}

import { LetterStatus } from './letter.js';
import { TimeHelper } from './timeHelper.js';
export var Stats;
(function (Stats) {
    const statsElement = document.getElementById('stats');
    function show(wpm, cpm, wordCount, letters, millisecondsPassed) {
        statsElement.style.display = 'block';
        const correctLetterCount = letters.filter(l => l.status === LetterStatus.CORRECT).length;
        const accuracyPercent = (correctLetterCount / letters.length) * 100;
        const timeStr = TimeHelper.millisecondsToHumanReadableTime(millisecondsPassed);
        statsElement.innerHTML = `Time: ${timeStr}<br>`;
        statsElement.innerHTML += `WPM: ${wpm | 0}, CPM: ${cpm | 0}<br>`;
        statsElement.innerHTML += `Accuracy: ${accuracyPercent.toFixed(2)}%, ${correctLetterCount | 0}/${letters.length}<br>`;
        statsElement.innerHTML += `Words: ${wordCount | 0}`;
    }
    Stats.show = show;
    function hide() {
        statsElement.style.display = 'none';
    }
    Stats.hide = hide;
})(Stats || (Stats = {}));

import { Switchracer as SwitchRacer } from './switchRacer.js';
export var TryAgainButton;
(function (TryAgainButton) {
    const tryAgainBtnElement = document.getElementById('try-again-btn');
    function hide() {
        tryAgainBtnElement.style.display = 'none';
    }
    TryAgainButton.hide = hide;
    function show() {
        tryAgainBtnElement.style.display = 'block';
    }
    TryAgainButton.show = show;
    tryAgainBtnElement.addEventListener('click', () => {
        SwitchRacer.restart();
    });
})(TryAgainButton || (TryAgainButton = {}));

export var TypingArea;
(function (TypingArea) {
    TypingArea.wordContainerElement = document.getElementById('word-container');
    function hide() {
        TypingArea.wordContainerElement.style.display = 'none';
    }
    TypingArea.hide = hide;
    function show() {
        TypingArea.wordContainerElement.style.display = 'block';
    }
    TypingArea.show = show;
})(TypingArea || (TypingArea = {}));

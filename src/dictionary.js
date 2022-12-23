import { allWords } from './data/words.js';
export var Dictionary;
(function (Dictionary) {
    let words = [];
    function getWord(idx) {
        return words[idx];
    }
    Dictionary.getWord = getWord;
    function getWordCount() {
        return words.length;
    }
    Dictionary.getWordCount = getWordCount;
    function loadRandomWords(count) {
        words = [];
        while (count-- > 0)
            words.push(allWords[Math.floor(Math.random() * allWords.length)]);
    }
    Dictionary.loadRandomWords = loadRandomWords;
})(Dictionary || (Dictionary = {}));

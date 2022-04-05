export class Dictionary {
    constructor() {
        this.words = [];
    }
    GetWord(idx) {
        return this.words[idx];
    }
    GetLength() {
        return this.words.length;
    }
    LoadWords() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        this.words = xhr.responseText.split('\n').filter(x => x != "");
                        resolve();
                    }
                    else {
                        alert('Failed to load words from the server');
                        reject();
                    }
                }
            };
            xhr.open('GET', '../data/words.txt');
            xhr.send();
        });
    }
    GetWords(count) {
        let result = [];
        while (count-- > 0) {
            result.push(this.words[Math.floor(Math.random() * this.words.length)]);
        }
        return result;
    }
}

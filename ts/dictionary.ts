export class Dictionary {
	public words: string[];

	public constructor() {
		this.words = [];
	}

	public GetWord(idx: number): string {
		return this.words[idx];
	}

	public GetLength(): number {
		return this.words.length;
	}

	public LoadWords(): Promise<void> { return new Promise((resolve, reject) => {
			let xhr: XMLHttpRequest = new XMLHttpRequest();
			xhr.onreadystatechange = (): void => {
				if(xhr.readyState == 4) {
					if(xhr.status == 200) {
						this.words = xhr.responseText.split('\n').filter(x => x != "");
						resolve();
					} else {
						alert('Failed to load words from the server');
						reject();
					}
				}
			}

			xhr.open('GET', `${window.location.href}/data/words.txt`);
			xhr.send();
		});
	}

	public GetWords(count: number): string[] {
		let result: string[] = [];

		while(count-- > 0) {
			result.push(this.words[Math.floor(Math.random() * this.words.length)]);
		}

		return result;
	}
}

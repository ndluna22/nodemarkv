/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    // for (let i = 0; i < this.words.length; i++) {
    //   let word = this.words[i];
    //   if (!chain[word]) {
    //     chain[word] = [];
    //   }
    //   if (this.words[i + 1]) {
    //     chain[word].push(chain[i + 1]);
    //   }
    // }

    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      //if map object has word, word is return and new word is added to the end
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]); //if not, then update map entry with word, new word
    }

    this.chains = chains; //add to map array
  }

  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

//exports object

module.exports = {
  MarkovMachine,
};

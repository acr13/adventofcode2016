const R = require('ramda');

let charMap = {};

function pullMostCommonLetters() {
  var indicies = Object.keys(charMap);
  let word = '';

  for (var i = 0; i < indicies.length; i++) {
    let index = indicies[i];
    let letters = charMap[index];

    var chars = Object.keys(letters);
    let maxLetter = chars[0];

    for (var j = 0; j < chars.length; j++) {
      // switch < / > for part 1/2
      if (letters[chars[j]] < letters[maxLetter]) {
        maxLetter = chars[j];
      }
    }
    word += maxLetter;
  }

  return word;
}

function parseLine(line) {
  let l = line.length;
  for (var i = 0; i < l; i++) {
    let c = line.charAt(i);
    if (!charMap[i]) charMap[i] = {}
    if (!charMap[i][c]) charMap[i][c] = 0;
    charMap[i][c]++;
  }
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./6/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  let word = pullMostCommonLetters();
  console.log(word);
})

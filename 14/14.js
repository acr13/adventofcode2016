const md5 = require('blueimp-md5');
const R = require('ramda');

const input = 'jlmsuwbz';
const hashes = {};

let index = 0;
let secondIndex = 0;
let done = false;
let foundKeys = 0;
let keys = [];

const hasThreeInARow = hash => R.match(/(.)\1{2,}/, hash)
const hasFiveInARow = (hash, c) => {
  let regex = new RegExp('(' + c + ')\\1{4,}', 'g');
  return R.not(R.isEmpty(R.match(regex, hash)));
}

const part2 = (index) => {
  if (hashes[index]) return hashes[index];

  let hash = md5(input + index);
  for (var i = 0; i < 2016; i++) hash = md5(hash)

  hashes[index] = hash;
  return hash;
}

while (keys.length < 64) {
  let hash = part2(index);
  let matches = hasThreeInARow(hash);

  if (matches.length > 0) {
    let matchCharacter = matches[0].charAt(0);
    let found = false;
    secondIndex = index + 1;

    while (!found && (secondIndex - index) < 1000) {
      let secondHash = part2(secondIndex);

      if (hasFiveInARow(secondHash, matchCharacter)) {
        keys.push(index);
        found = true;
      }

      secondIndex++;
    }
  }

  index++;
}

console.log('last key', R.last(keys));
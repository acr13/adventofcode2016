let VALID_WORDS = 0;

validIP = (abas, babs) => {
  let aKeys = Object.keys(abas);
  let bKeys = Object.keys(babs);

  for (var i = 0; i < aKeys.length; i++) {
    let key = aKeys[i];
    let inverted = key.charAt(1) + key.charAt(0) + key.charAt(1);
    if (babs[inverted]) return true;
  }

  return false;
}

function parseLine(line) {
  // console.log(line);

  let IN_SQUARE_BRACKETS = false;

  let ABAS = {};
  let BABS = {};

  // don't go past the last 2 chars
  for (var i = 0; i < (line.length - 2); i++) {
    let currentChar = line.charAt(i);

    if (currentChar === '[') IN_SQUARE_BRACKETS = true;
    else if (currentChar === ']') IN_SQUARE_BRACKETS = false;
    // possible palindrome
    else if (line.charAt(i + 2) === currentChar && line.charAt(i + 1) !== currentChar) {
      let pdrome = line.substring(i, i + 3);

      if (IN_SQUARE_BRACKETS) {
        BABS[pdrome] = true;
      } else {
        ABAS[pdrome] = true;
      }
    }
  }

  if (validIP(ABAS, BABS)) {
    VALID_WORDS++;
  }
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./7/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log(VALID_WORDS);
})

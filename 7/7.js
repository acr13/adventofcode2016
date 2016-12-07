let VALID_WORDS = 0;

function parseLine(line) {
  // console.log(line);

  let valid = false;
  let forceInvalid = false;
  let IN_SQUARE_BRACKETS = false;

  // don't go past the last 3 chars
  for (var i = 0; i < (line.length - 3); i++) {
    let currentChar = line.charAt(i);

    // console.log(currentChar);

    if (currentChar === '[') IN_SQUARE_BRACKETS = true;
    else if (currentChar === ']') IN_SQUARE_BRACKETS = false;
    // possible palindrome
    else if (line.charAt(i + 3) === currentChar) {
      if (line.charAt(i + 1) === line.charAt(i + 2) &&
          line.charAt(i + 1) !== currentChar) {
          // console.log('** PALINDROME **', line.substring(i, i + 4));
          if (IN_SQUARE_BRACKETS) forceInvalid = true;
          valid = true;
          i += 3;
      }
    }
  }

  if (!forceInvalid && valid) VALID_WORDS++;
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./7/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log(VALID_WORDS);
})

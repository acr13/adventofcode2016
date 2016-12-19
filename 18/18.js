const TARGET_ROWS = 399999; // 39;
const start = '.^..^....^....^^.^^.^.^^.^.....^.^..^...^^^^^^.^^^^.^.^^^^^^^.^^^^^..^.^^^.^^..^.^^.^....^.^...^^.^.';

let safeSpots = 0;
let rows  = [
  start
];

for (var i = 0; i < start.length; i++) start.charAt(i) === '.' ? safeSpots++ : false

for (var i = 0; i < TARGET_ROWS; i++) {
  let newRow = '';
  for (var j = 0; j < start.length; j++) {
    let left = j > 0 ? rows[i].charAt(j - 1) : '.';
    let center = rows[i].charAt(j);
    let right = j < start.length - 1 ? rows[i].charAt(j + 1) : '.';
    let nextChar = '.';

    if (left === '^' && center === '^' && right === '.') {
      nextChar = '^';
    } else if (left === '.' && center === '^' && right === '^') {
      nextChar = '^';
    } else if (left === '^' && center === '.' && right === '.') {
      nextChar = '^';
    } else if (left === '.' && center === '.' && right === '^') {
      nextChar = '^';
    }

    safeSpots = nextChar === '.' ? safeSpots + 1 : safeSpots;
    newRow += nextChar;
  }

  rows.push(newRow);
}

console.log(safeSpots);
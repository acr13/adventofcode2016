let SCREEN = [
  [],
  [],
  [],
  [],
  [],
  [],
];

for (var i = 0; i < SCREEN.length; i++) {
  for (var j = 0; j < 50; j++) {
    SCREEN[i].push(false);
  }
}

function drawRect(width, height) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      SCREEN[i][j] = true;
    }
  }
}

function rotateColumn(x, offset) {
  let newStartOfColumn = [];
  for (var i = SCREEN.length - 1; i > ((SCREEN.length - 1) - offset); i--) {
    newStartOfColumn.push(SCREEN[i][x]);
  }

  // go backwards from the bottom of the column
  // if the offset behind is is true, set this one to true
  for (var i = SCREEN.length - 1; i >= offset; i--) {
    if (SCREEN[i - offset][x]) {
      SCREEN[i][x] = true;
      SCREEN[i - offset][x] = false;
    } else {
      SCREEN[i][x] = false;
    }
  }

  for (var i = 0; i < offset; i++) {
    SCREEN[i][x] = newStartOfColumn[newStartOfColumn.length - 1 - i];
  }
}

function rotateRow(y, offset) {
  var newStartOfRow = [];
  for (var i = SCREEN[y].length - 1; i > ((SCREEN[y].length - 1) - offset); i--) {
    newStartOfRow.push(SCREEN[y][i]);
  }

  for (var i = SCREEN[y].length - 1; i >= offset; i--) {
    if (SCREEN[y][i - offset]) {
      SCREEN[y][i] = true;
      SCREEN[y][i - offset] = false;
    } else {
      SCREEN[y][i] = false;
    }
  }

  for (var i = 0; i < offset; i++) {
    SCREEN[y][i] = newStartOfRow[newStartOfRow.length - 1 - i]
  }
}

function parseLine(line) {
  listInput = line.split(' ');

  if (listInput[0] === 'rect') {
    let width = listInput[1].split('x')[0];
    let height = listInput[1].split('x')[1];
    drawRect(width, height);
  } else if (listInput[1] === 'column') {
    let x = parseInt(listInput[2].split('=')[1]);
    let offset = parseInt(listInput[4]);
    rotateColumn(x, offset);
  } else if (listInput[1] === 'row') {
    let y = parseInt(listInput[2].split('=')[1]);
    let offset = parseInt(listInput[4]);
    rotateRow(y, offset);
  }
}

function numberOfLit() {
  let n = 0;
  for (var i = 0; i < SCREEN.length; i++) {
    for (var j = 0; j < SCREEN[i].length; j++) {
      if (SCREEN[i][j]) n++;
    }
  }
  return n;
}

// 10 letters
// width 5
// height 6
function printLetters() {
  let letters = [];

  for (var i = 0; i < SCREEN.length; i++) {
    for (var j = 0; j < SCREEN[i].length; j++) {
      let letterIndex = Math.floor(j / 5);
      if (!letters[letterIndex]) {
        console.log('making new letter');
        letters[letterIndex] = [[], [], [], [], [], []];
      }

      letters[letterIndex][i][j % 5] = SCREEN[i][j] ? 1: 0;
    }
  }

  return letters;
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./8/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  // console.log(SCREEN);
  // console.log(numberOfLit());
  console.log(printLetters());
})
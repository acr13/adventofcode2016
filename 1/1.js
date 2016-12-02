const input = 'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3';
// const input = 'R2, L3';
// const input = 'R2, R2, R2';
// const input = 'R5, L5, R5, R3';
// const input = 'L5, R5, L5, L3';
const inputArray = input.split(', ');
let currentPosition = [0, 0, 'N'];

function moveTo(dir, amnt) {
  if (currentPosition[2] === 'N') {
    if (dir === 'R') {
      currentPosition = [currentPosition[0] + amnt, currentPosition[1], 'E'];
    } else { // === 'L'
      currentPosition = [currentPosition[0] - amnt, currentPosition[1], 'W'];
    }
  } else if (currentPosition[2] === 'E') {
    if (dir === 'R') {
      currentPosition = [currentPosition[0], currentPosition[1] - amnt, 'S'];
    } else { // === 'L'
      currentPosition = [currentPosition[0], currentPosition[1] + amnt, 'N'];
    }
  } else if (currentPosition[2] === 'S') {
    if (dir === 'R') {
      currentPosition = [currentPosition[0] - amnt, currentPosition[1], 'W'];
    } else {
      currentPosition = [currentPosition[0] + amnt, currentPosition[1], 'E'];
    }
  } else if (currentPosition[2] === 'W') {
    if (dir === 'R') {
      currentPosition = [currentPosition[0], currentPosition[1] + amnt, 'N'];
    } else {
      currentPosition = [currentPosition[0], currentPosition[1] - amnt, 'S'];
    }
  }
  // console.log(currentPosition);
}

function distance() {
  return Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]);
}

inputArray.map(move => {
  moveTo(move[0], parseInt(move.substr(1)));
});

console.log('** FINAL', currentPosition);
console.log('** DISTANCE ===', distance());

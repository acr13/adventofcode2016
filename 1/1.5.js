const input = 'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3';
// const input = 'R2, L3';
// const input = 'R2, R2, R2';
// const input = 'R5, L5, R5, R3';
// const input = 'L5, R5, L5, L3';
// const input = 'R8, R4, R4, R8';
const inputArray = input.split(', ');

// map of 'x,y' coords with a number associated with them.
let visitedPositions = {};
let currentPosition = [0, 0, 'N'];

function mapKey(x, y) {
  return '' + x + ', ' + y;
}

function addToVisited(key) {
  // console.log(key);

  if (!visitedPositions[key]) {
    visitedPositions[key] = 0;
  }

  visitedPositions[key]++;

  if (visitedPositions[key] === 2) {
    console.log('SECOND', key);
    console.log(distance());
    process.exit(1);
  }
}

function moveTo(dir, amnt) {
  if (currentPosition[2] === 'N') {
    if (dir === 'R') {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0] + 1, currentPosition[1], 'E'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    } else { // === 'L'
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0] - 1, currentPosition[1], 'W'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    }
  } else if (currentPosition[2] === 'E') {
    if (dir === 'R') {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0], currentPosition[1] - 1, 'S'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    } else { // === 'L'
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0], currentPosition[1] + 1, 'N'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    }
  } else if (currentPosition[2] === 'S') {
    if (dir === 'R') {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0] - 1, currentPosition[1], 'W'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    } else {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0] + 1, currentPosition[1], 'E'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    }
  } else if (currentPosition[2] === 'W') {
    if (dir === 'R') {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0], currentPosition[1] + 1, 'N'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
    } else {
      for (var i = 1; i <= amnt; i++) {
        currentPosition = [currentPosition[0], currentPosition[1] - 1, 'S'];
        addToVisited(mapKey(currentPosition[0], currentPosition[1]));
      }
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

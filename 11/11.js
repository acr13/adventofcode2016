const R = require('ramda');

const trimKnownMoves = (moves, visited) => {
  return moves.filter(move => visited.indexOf(move.join('')) === -1);
}

const getCurrentStateOfRow = (row) => {
  let thingsOnThisRow = {};

  // current state of this row
  for (var i = 0; i < row.length; i++) {
    if (row[i]) {
      // the letter of our thing
      let prefix = row[i].charAt(0);
      if (!thingsOnThisRow[prefix]) thingsOnThisRow[prefix] = [false, false];

      // CHIP IS ALWAYS FIRST
      // [CHIP, GENERATOR]
      if (row[i].charAt(1) === 'M') {
        thingsOnThisRow[prefix][0] = true;
      } else {
        thingsOnThisRow[prefix][1] = true;
      }
    }
  }

  return thingsOnThisRow;
}

const cloneState = (state) => {
  let newState = [];
  for (var i = 0; i < state.length; i++) {
    newState[i] = [];
    for (var j = 0; j < state[i].length; j++) {
      newState[i][j] = state[i][j];
    }
  }
  return newState;
}

const getPossibleMoves = (state) => {
  const thingsToMove = [];
  let elevator = state[0];
  let dist = state[2];

  for (var i = 0; i < dist[elevator].length; i++) {
    // keep track of the (y, x) coords
    if (dist[elevator][i]) thingsToMove.push( [elevator, i] );
  }

  // Moves will look like this:
  // [isMultiple, isUp, startY, startX, endY, endX, ... second coords]
  let moves = [];

  for (var i = 0; i < thingsToMove.length; i++) {
    for (var j = i + 1; j < thingsToMove.length; j++) {
      if (i !== j) {
        if (elevator > 0) {
          moves.push(
            [
              true, true, thingsToMove[i][0], thingsToMove[i][1], thingsToMove[i][0] - 1, thingsToMove[i][1],
              thingsToMove[j][0], thingsToMove[j][1], thingsToMove[j][0] - 1, thingsToMove[j][1]
            ]
          );
        }
        if (elevator < dist.length - 1) {
          moves.push(
            [
              true, false, thingsToMove[i][0], thingsToMove[i][1], thingsToMove[i][0] + 1, thingsToMove[i][1],
              thingsToMove[j][0], thingsToMove[j][1], thingsToMove[j][0] + 1, thingsToMove[j][1]
            ]
          );
        }
      }
    }
  }

  for (var i = 0; i < thingsToMove.length; i++) {
    if (elevator > 0) {
      moves.push(
        [false, true, thingsToMove[i][0], thingsToMove[i][1], thingsToMove[i][0] - 1, thingsToMove[i][1]]
      );
    }
    if (elevator < dist.length - 1) {
      moves.push(
        [false, false, thingsToMove[i][0], thingsToMove[i][1], thingsToMove[i][0] + 1, thingsToMove[i][1]]
      );
    }
  }


  let validMoves = trimInvalidMoves(dist, moves);
  let newMoves = trimKnownMoves(validMoves, visited);
  let newStates = newMoves.map(move => {
    let nextFloor = move[1] ? elevator - 1 : elevator + 1;
    let newDist = makeMove(dist, move);
    visited.push(newDist.join(''));

    return [nextFloor, state[1] + 1, newDist];
  });

  return newStates;
}

const trimInvalidMoves = (state, possibleMoves) => {
  return possibleMoves.filter(move => {
    let newState = makeMove(state, move);

    return isValidRow(newState[move[4]]);
  });
}

const isValidRow = (row) => {
  const currentStateOfRow = getCurrentStateOfRow(row);
  const keys = Object.keys(currentStateOfRow);

  // A row is 'invalid' if we have a CHIP without its GENERATOR
  // AND there is some other generator there.
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (currentStateOfRow[key][0] && !currentStateOfRow[key][1]) {
      for (var j = 0; j < keys.length; j++) {
        if (keys[j] !== key && currentStateOfRow[keys[j]][1]) {
          return false;
        }
      }
    }
  }

  return true;
}

const makeMove = (state, move) => {
  let stateCopy = cloneState(state);

  // move 2 things at once
  if (move[0]) {
    stateCopy[move[4]][move[5]] = stateCopy[move[2]][move[3]];
    stateCopy[move[8]][move[9]] = stateCopy[move[6]][move[7]];

    stateCopy[move[2]][move[3]] = '';
    stateCopy[move[6]][move[7]] = '';
  } else {
    stateCopy[move[4]][move[5]] = stateCopy[move[2]][move[3]];
    stateCopy[move[2]][move[3]] = '';
  }

  return stateCopy;
}

const bfs = (state) => {
  let moves = 0;
  let newMoves = getPossibleMoves(state);

  while (nextMove = newMoves.shift()) {
    console.log(nextMove);
    const [ elevator, moves, dist ] = nextMove;
    // console.log(elevator, moves, dist);
    if (isComplete(dist)) {
      return moves;
    }

    newMoves = newMoves.concat(getPossibleMoves(nextMove));
  }
}

const isComplete = (dist) => {
  for (let i = 0; i < dist[0].length; i++) {
    if (dist[0][i] === '') return false;
  }
  return true;
}

const distribution = [
  ['', '', '', ''],
  ['', '', 'LG', ''],
  ['HG', '', '', ''],
  ['', 'HM', '', 'LM'],
];
let visited = [
  distribution.join(''),
];

// [ floor, moves, state ]
let state = [
  distribution.length - 1, 0, distribution
];

console.log(state);

// console.log('** Num Moves', bfs(state));

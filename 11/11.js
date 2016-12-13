const R = require('ramda');

const isOldMove = (visited, move) => visited.indexOf(move.join('')) !== -1;
const isComplete = (state) => {
  for (var i = 0; i < STATE[0].length; i++) {
    if (STATE[0][i] === '') {
      return false;
    }
  }

  return true;
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

  // console.log(thingsOnThisRow);

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

const getPossibleMoves = (state, elevator) => {
  const thingsToMove = [];

  // console.log(state, elevator);

  for (var i = 0; i < state[elevator].length; i++) {
    // keep track of the (y, x) coords
    if (state[elevator][i]) thingsToMove.push( [elevator, i] );
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
        if (elevator < state.length - 1) {
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
    if (elevator < state.length - 1) {
      moves.push(
        [false, false, thingsToMove[i][0], thingsToMove[i][1], thingsToMove[i][0] + 1, thingsToMove[i][1]]
      );
    }
  }

  // console.log(moves);
  return moves;
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

  // console.log(row);

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

  console.log(row, true);

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

const trimKnownMoves = (moves, visited) => {
  return moves.filter(move => visited.indexOf(move.join('')) === -1);
}

const getShortestPath = (state, visited, elevator, moves) => {
  console.log('*** NEW STATE **');
  console.log(state);
  console.log('******');

  // base case
  if (isComplete(state)) {
    return moves;
  }

  // get all possible moves
  let possibleMoves = getPossibleMoves(state, elevator);
  let validMoves = trimInvalidMoves(state, possibleMoves);
  let newMoves = trimKnownMoves(validMoves, visited);

  // console.log(validMoves);
  // console.log(newMoves);

  let movesToMake = []

  validMoves.map(move => {
    let nextState = makeMove(state, move);
    let newElevator = move[1] ? elevator - 1 : elevator + 1;
    movesToMake.push(
      getShortestPath(nextState, R.append(nextState.join(''), visited), newElevator, moves + 1)
    );
  });

  return Math.min(...movesToMake);
}

const STATE = [
  // ['', '', '', ''],
  ['', '', 'LG', ''],
  ['HG', '', '', ''],
  ['', 'HM', '', 'LM'],
];
const visited = [
  STATE.join(''),
];
const elevator = STATE.length - 1;
const moves = 0;

// console.log(STATE);

let done = false;
while (!done) {
  let shortestPath = getShortestPath(STATE, visited, elevator, moves);
  done = true;
  // console.log(shortestPath);
}




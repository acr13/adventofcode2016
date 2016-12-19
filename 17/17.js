const md5 = require('blueimp-md5');

const goodLetters = ['b', 'c', 'd', 'e', 'f'];

const validSpot = (spot) => {
  if (spot[0] >= 0 && spot[0] < 4 && spot[1] >= 0 && spot[1] < 4) {
    return true;
  }

  return false;
};

const getNewMoves = state => {
  let [path, pos] = state;

  let nextHash = md5(path);
  let firstFour = nextHash.substring(0, 4);
  
  let newStates = [];

  if (goodLetters.indexOf(firstFour.charAt(0)) !== -1 && validSpot([pos[0] - 1, pos[1]])) {
    newStates.push([path + 'U', [pos[0] - 1, pos[1]]]);
  } if (goodLetters.indexOf(firstFour.charAt(1)) !== -1 && validSpot([pos[0] + 1, pos[1]])) {
    newStates.push([path + 'D', [pos[0] + 1, pos[1]]]);  
  } if (goodLetters.indexOf(firstFour.charAt(2)) !== -1 && validSpot([pos[0], pos[1] - 1])) {
    newStates.push([path + 'L', [pos[0], pos[1] - 1]]);
  } if (goodLetters.indexOf(firstFour.charAt(3)) !== -1 && validSpot([pos[0], pos[1] + 1])) {
    newStates.push([path + 'R', [pos[0], pos[1] + 1]]);
  }

  return newStates;
};

const bfs = (input, part2) => {
  let longestPath = 0;

  let path = input;
  let currentPosition = [0, 0];
  let state = [path, currentPosition];

  let newMoves = getNewMoves(state);

  while (nextMove = newMoves.shift()) {
    if (nextMove[1][0] === 3 && nextMove[1][1] === 3) {
      let path = nextMove[0].substring(input.length);;
      longestPath = path.length;
    } else {
      newMoves = newMoves.concat(getNewMoves(nextMove));
    }
  }

  return longestPath;
};

// console.log(bfs('hijkl'));
console.log(bfs('ihgpwlah'));
console.log(bfs('kglvqrro'));
console.log(bfs('ulqzkmiv'));
console.log(bfs('udskfozm'));
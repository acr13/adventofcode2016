const R = require('ramda');

let visited = {};

const FAVORITE_NUMBER = 1350;
const computePolynomial = (x, y) =>
  Math.pow(x, 2) + (3 * x) + (2 * x * y) + y + Math.pow(y, 2);
const addFavoriteNumber = num => num + FAVORITE_NUMBER;
const toBinary = num => num.toString(2);
const isOne = n => n === '1';
const numBits = num => R.filter(isOne, num);
const isEven = n => n % 2 === 0;

const isOpenSpace = (x, y) =>
  R.pipe(
    computePolynomial,
    addFavoriteNumber,
    toBinary,
    numBits,
    R.length,
    isEven
  )(x, y);

const calculateAdjacentSpots = (grid, position, numMoves) => {
  let startX = position.x;
  let startY = position.y;
  let adjacents = [
    [startY > 0 ? startY - 1 : null, startX], // up
    [startY, startX + 1], // right
    [startY + 1, startX], // down
    [startY, startX > 0 ? startX - 1 : null], // left
  ];

  adjacents = adjacents.filter(coords => !visited[coords[1] + ',' + coords[0]]);
  adjacents = adjacents.filter(coords => coords[0] !== null && coords[1] !== null);

  // setup the new moves in the grid
  adjacents = adjacents.map(coords => {
    // is a space we haven't seen yet
    if (grid[coords[0]][coords[1]] === '') {
      isOpenSpace(coords[1], coords[0]) ?
        grid[coords[0]][coords[1]] = '.' :
        grid[coords[0]][coords[1]] = '#';
    } else {
      return [null, null];
    }

    coords[2] = numMoves + 1;

    return coords;
  });

  // no walls
  adjacents = adjacents.filter(coords => coords[0] !== null && coords[1] !== null);
  adjacents = adjacents.filter(coords => grid[coords[0]][coords[1]] === '.');

  // console.log(grid);

  // return new positions we are 'at';
  return adjacents;
}

const makeStartingGrid = (endX, endY) => {
  let n = Math.max(endX, endY) * 2;
  let grid = [];

  for (var i = 0; i < n; i++) {
    grid[i] = [];
    for (var j = 0; j < n; j++) {
      grid[i][j] = '';
    }
  }

  return grid;
}

const findShortestPath = (endX, endY) => {
  let grid = makeStartingGrid(endX, endY);
  let position = { x: 1, y: 1 };

  grid[position.y][position.x] = 'O';
  visited[`${position.x},${position.y}`] = true;

  newMoves = calculateAdjacentSpots(grid, position, 0);

  while (nextMove = newMoves.shift()) {
    // console.log(nextMove);
    let [ currentY, currentX, numMoves ] = nextMove;


    if (currentY === endY && endX === currentX) { // || numMoves = 51 {
      // console.log(grid);
      console.log(Object.keys(visited).length);
      return numMoves;
    }

    grid[currentY][currentX] = 'O';
    visited[`${currentX},${currentY}`] = true;

    newMoves = newMoves.concat(calculateAdjacentSpots(grid, { x: currentX, y: currentY }, numMoves));
  }
};

console.log(findShortestPath(31, 39));
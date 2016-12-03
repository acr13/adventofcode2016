const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./3/input.txt')
});

let lineGroup = [];
let VALID_TRIANGLES = 0;

function isValidTriangle(x, y, z) {
  if (((x + y) > z) &&
    ((x + z) > y) &&
    (((y + z) > x))) {
    return true;
  }

  return false;
}

let x = 0;

lineReader.on('line', line => {
  const points = line.split(' ')
    .filter(p => p !== '')
    .map(p => parseInt(p));
  // console.log(points);

  lineGroup.push(points);
  if (lineGroup.length === 3) {
    if (isValidTriangle(lineGroup[0][0], lineGroup[1][0], lineGroup[2][0])) {
      VALID_TRIANGLES++;
    }
    if (isValidTriangle(lineGroup[0][1], lineGroup[1][1], lineGroup[2][1])) {
      VALID_TRIANGLES++;
    }
    if (isValidTriangle(lineGroup[0][2], lineGroup[1][2], lineGroup[2][2])) {
      VALID_TRIANGLES++;
    }

    lineGroup = [];
  }
});

lineReader.on('close', () => {
  console.log('VALID TRIANGLES:', VALID_TRIANGLES);
})

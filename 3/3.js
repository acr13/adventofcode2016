const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./3/input.txt')
});

let VALID_TRIANGLES = 0;

function isValidTriangle(x, y, z) {
  // console.log(x, y, z);

  if (((x + y) > z) &&
    ((x + z) > y) &&
    (((y + z) > x))) {
    return true;
  }

  return false;
}

lineReader.on('line', line => {
  const points = line.split(' ')
    .filter(p => p !== '')
    .map(p => parseInt(p));

  if (isValidTriangle(points[0], points[1], points[2])) {
    VALID_TRIANGLES++;
  }
});

lineReader.on('close', () => {
  console.log('VALID TRIANGLES:', VALID_TRIANGLES);
})

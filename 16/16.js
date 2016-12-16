const R = require('ramda');

const swapChars = c => c === '1' ? '0' : '1';
const dragonCurve = input => R.clone(input) + '0' + R.map(swapChars, R.reverse(R.clone(input))).join('');

const calculateChecksum = input => {
  let checksum = '';
  for (let i = 0; i < input.length; i += 2) {
    let pair = input.substring(i, i + 2);

    if (pair === '00' || pair === '11') {
      checksum += '1'
    } else {
      checksum += '0';
    }
  }

  if (checksum.length % 2 === 0) {
    return calculateChecksum(checksum);
  }

  return checksum;
}

const day16 = (input, targetLength) => {
  let dragonString = input;

  while (dragonString.length < targetLength) {
    dragonString = dragonCurve(dragonString);
  }

  let diff = dragonString.length - targetLength;
  let convertedString = dragonString.slice(0, diff * -1);

  return calculateChecksum(convertedString);
}

// console.log(day16('10000', 20));
// console.log(day16('10011111011011001', 272));
console.log(day16('10011111011011001', 35651584));
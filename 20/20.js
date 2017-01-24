var fs  = require("fs");
const R = require('ramda');

let blocked = [];

// const blocked = [ '5-8', '0-2', '4-7', ];

fs.readFileSync('./20-input.txt').toString().split('\n').forEach(line => blocked.push(line.trim()));

const separateHighAndLow = (range) => {
  let parts = range.split('-');
  let low = parseInt(parts[0]);
  let high = parseInt(parts[1]);

  return { low, high }
};
const diff = (a, b) => a - b;

let blacklist = R.map(separateHighAndLow, blocked);

// part 1
let currentIp = 0;

// part 2
let MAX_IP = 4294967295;
let numValid = 0;

// loop until we find an IP that is valid
while (currentIp <= MAX_IP) {
  let isValid = true;
  // for each IP, see if we fall in a range. If so, check the next possible value
  for (var i = 0; i < blacklist.length; i++) {
    // bad value
    if (currentIp >= blacklist[i].low && currentIp <= blacklist[i].high) {
      currentIp = blacklist[i].high + 1;
      isValid = false;
    }
  }

  if (isValid) {
    numValid++;
    currentIp++;
    // break; // <-- part 1
  }
}

// console.log(currentIp);
console.log(numValid);
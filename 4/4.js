const R = require('ramda');

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./4/input.txt')
});

let SUM = 0;
let currentRoomHash = {};

function compareByValue(a, b) {
  if (a[1] < b[1]) {
    return 1;
  } else if (a[1] > b[1]) {
    return -1;
  }
  return 0;
}

function sortByAlpha(list) {
  let swapped = true;
  while (swapped) {
      swapped = false;
      for (var i=0; i < list.length-1; i++) {
          if (list[i][1] === list[i+1][1] &&
            list[i][0] > list[i+1][0]) {
              var temp = list[i];
              list[i] = list[i+1];
              list[i+1] = temp;
              swapped = true;
          }
      }
  }

  return list;
}

// the top 5 characters are sorted
// by the number of times they appear
// ties broken by alphabetization
function isValidRoom(check) {
  let pairs = R.toPairs(currentRoomHash);
  let sortedPairs = pairs.sort(compareByValue);
  sortedPairs = sortByAlpha(sortedPairs);

  let top5 = sortedPairs.reduce((acc, pair) => acc + pair[0], '')
    .substring(0, 5);

  console.log(check, top5);

  return check === top5;
}

function parseRoom(room) {
  let parts = room.split('-');
  currentRoomHash = {};

  for (let i = 0; i < parts.length; i++) {

    // last part of the string
    if (i === (parts.length - 1)) {
      let checkSum = parseInt(parts[i].substring(0, parts[i].indexOf('[')));
      let hash = parts[i].substr(parts[i].indexOf('[') + 1).slice(0, -1);
     if (isValidRoom(hash)) {
       console.log(checkSum, SUM);
       SUM += checkSum;
     }
    } else {
      let part = parts[i];
      for (var j = 0; j < part.length; j++) {
        if (!currentRoomHash[part.charAt(j)]) {
          currentRoomHash[part.charAt(j)] = 0;
        }
        currentRoomHash[part.charAt(j)]++;
      }
    }
  }
}

lineReader.on('line', line => parseRoom(line));
lineReader.on('close', () => {
  console.log('SUM OF VALID:', SUM);
})

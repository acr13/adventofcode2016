const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./4/input.txt')
});

let sectorID = 0;
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function getSectorId(room) {
  return parseInt(room.substring(room.lastIndexOf('-') + 1, room.indexOf('[')));
}

function getIndex(char) {
  let index = -1;

  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === char) {
      return i;
    }
  }

  return index;
}

function getNextChar(char, offsetValue) {
  let offset = offsetValue % alphabet.length;
  let currentIndex = getIndex(char);

  if ((currentIndex + offset) > (alphabet.length - 1)) {
    offset = (currentIndex + offset) - alphabet.length;
    currentIndex = 0;
  }

  let nextChar = alphabet[currentIndex + offset];
  return nextChar;
}

// northpole object storage
function parseRoom(room) {
  const sID = getSectorId(room);
  let jumbleRoom = room.split('-')
    .slice(0, -1)
    .join(' ');
  let answerRoom = '';

  for (let i = 0; i < jumbleRoom.length; i++) {
    if (jumbleRoom.charAt(i) === ' ') {
      answerRoom += ' ';
    } else {
      answerRoom += getNextChar(jumbleRoom.charAt(i), sID);
    }
  }

  if (answerRoom === 'northpole object storage') {
    sectorID = sID;
  }
}

lineReader.on('line', line => parseRoom(line));
lineReader.on('close', () => {
  console.log('sectorID:', sectorID);
})

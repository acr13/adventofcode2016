const fs  = require('fs');
const perm = require('permutation');
const R = require('ramda');

let input = [];
fs.readFileSync('./21-input.txt').toString().split('\n').forEach(line => input.push(line.trim()));

let word = '';

const swapPosition = (start, end) => {
  if (start > end) {
    let temp = end;
    end = start;
    start = temp;
  }

  return word.substr(0, start) + word.charAt(end) + word.substr(start + 1, end - start - 1) + word.charAt(start) + word.substr(end + 1);
};

const execute = (instruc) => {
  let parts = instruc.split(' ');

  if (parts[0] === 'swap') {
    let start = parseInt(parts[2]);
    let end = parseInt(parts[5]);

    if (parts[1] === 'letter') {
      start = word.indexOf(parts[2]);
      end = word.indexOf(parts[5]);
    }

    word = swapPosition(start, end);
  } else if (parts[0] === 'reverse') {
    let start = parseInt(parts[2]);
    let end = parseInt(parts[4]);
    if (start > end) {
      let temp = end;
      end = start;
      start = temp;
    }
    
    word = word.substr(0, start) + R.reverse(word.substr(start, end - start + 1)) + word.substr(end + 1);
  } else if (parts[0] === 'rotate') {
    let offset = parseInt(parts[2]);
    if (offset > word.length) {
      offset = offset % word.length;
    }

    if (parts[1] === 'left') {
      word = word.substr(offset) + word.substr(0, offset);
    } else if (parts[1] === 'right') {
      word = word.substr(word.length - offset) + word.substr(0, word.length - offset);
    } else { // based on positon
      let target = parts[6];
      let offset = word.indexOf(target) >= 4 ? word.indexOf(target) + 2 : word.indexOf(target) + 1;
      
      if (offset > word.length) {
        offset = offset % word.length
      }

      word = word.substr(word.length - offset) + word.substr(0, word.length - offset);
    }

  } else if (parts[0] === 'move') {
    let removePosition = parseInt(parts[2]);
    let insertPosition = parseInt(parts[5]);
    let c = word.charAt(removePosition);
    word = word.substr(0, removePosition) + word.substr(removePosition + 1);
    word = word.substr(0, insertPosition) + c + word.substr(insertPosition);
  }
};

// input.map(instruc => execute(instruc));
// console.log(word);

const l = perm('abcdefgh');
for (var i = 0; i < l.length; i++) {
  word = l[i];
  input.map(instruc => execute(instruc));
  if (word === 'fbgdceah') {
    console.log(l[i]);
    break;
  }
}


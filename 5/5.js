const md5 = require('blueimp-md5');

const input = 'ugkcyxxp'
// const input = 'abc';

let index = 0;
let password = [];

function isComplete() {
  for (var i = 0; i < 8; i++) {
    if (typeof password[i] === 'undefined') {
      return false;
    }
  }
  return true;
}

while (!isComplete()) {
  let hash = md5(input + index);
  if (hash.substr(0, 5) === '00000') {
    let position = hash.charAt(5);

    if (position < 8) {
      if (!password[position]) {
        password[position] = hash.charAt(6);
      }
    }
  }

  index++;
}

console.log(password.join(''));
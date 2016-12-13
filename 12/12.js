const input = [];
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./12/input.txt')
});
lineReader.on('line', line => input.push(line));
lineReader.on('close', () => {
  start();
})

/*
const input = [
  'cpy 41 a',
  'inc a',
  'inc a',
  'dec a',
  'jnz a 2',
  'dec a',
];
*/

let state = {
  a: 0,
  b: 0,
  c: 1, // 0,
  d: 0,
};

const start = () => {
  for (let i = 0; i < input.length; i++) {
    const parts = input[i].split(' ');
    let instruc = parts[0];
    if (instruc === 'cpy') {
      let val = parseInt(parts[1]);
      if (isNaN(val)) val = state[parts[1]];
      state[parts[2]] = val;
    } else if (instruc === 'inc') {
      state[parts[1]]++;
    } else if (instruc === 'dec') {
      state[parts[1]]--;
    } else if (instruc === 'jnz') {
      let val = parseInt(parts[1]);
      if (isNaN(val)) val = state[parts[1]];
      if (val !== 0) i += parseInt(parts[2]) - 1;
    }
  }

  console.log(state.a);
};

const input = [];
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./23-input.txt')
});
lineReader.on('line', line => input.push(line));
lineReader.on('close', () => { start(); });

/*
const input = [
  'cpy 2 a',
  'tgl a',
  'tgl a',
  'tgl a',
  'cpy 1 a',
  'dec a',
  'dec a'
];
*/

let state = {
  a: 12,
  b: 0,
  c: 0,
  d: 0,
};

const start = () => {
  for (let i = 0; i < input.length; i++) {
    const parts = input[i].split(' ');
    // console.log(parts, state);
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
      if (val !== 0) {
        if (isNaN(parts[2])) {
          i += parseInt(state[parts[2]]) - 1;
        } else {
          i += parseInt(parts[2]) - 1;
        }
      }
    } else if (instruc === 'tgl') {
      let futureInstruc = input[i + state[parts[1]]];
      let newInstruc = '';
      //console.log('futureInstruc', futureInstruc);
      if (futureInstruc) {
        let p = futureInstruc.split(' ');
        if (p[0] === 'inc') {
          newInstruc = 'dec ' + p[1];
        } else if (p[0] === 'jnz') {
          newInstruc = 'cpy ' + p[1] + ' ' + p[2];
        } else if (p.length === 2) {
          newInstruc = 'inc ' + p[1];
        } else if (p.length === 3) {
          newInstruc = 'jnz ' + p[1]  + ' ' + p[2];
        }

        // console.log('newInstruc', newInstruc);
        input[i + state[parts[1]]] = newInstruc;
      }
    }
  }

  console.log(state.a);
};

let state = {};
let instructions = [];

const createInstructions = (line) => instructions.push(line);
const createInitialState = () => {
  instructions.map(line => {
    const parts = line.split(' ');

    if (parts[0] === 'value') {
      let val = parseInt(parts[1]);
      let botNumber = parts[5];

      if (!state[botNumber]) state[botNumber] = [];
      state[botNumber].push(val);

      if (state[botNumber].length === 2) state[botNumber].sort((a, b) => a - b);
    }
  });
  console.log(state);
}

const executeInstructions = () => {
  let finished = true
  instructions.map(line => {
    const parts = line.split(' ');

    if (parts[0] === 'bot') {
      let startingBotNumber = parts[1];

      if (state[startingBotNumber] && state[startingBotNumber].length === 2) {
        finished = false;

        let lowTarget = parts[5];
        let lowTargetNumber = parts[6];

        let highTarget = parts[10];
        let highTargetNumber = parts[11];

        let lowValue = state[startingBotNumber].splice(0, 1)[0];
        let highValue = state[startingBotNumber].splice(0, 1)[0];

        /*
        if (lowValue === 17 && highValue === 61) {
          console.log('** bot', startingBotNumber);
          process.exit(0);
        }
        */

        if (lowTarget === 'bot') {
          if (!state[lowTargetNumber]) state[lowTargetNumber] = [];
          state[lowTargetNumber].push(lowValue);
          state[lowTargetNumber].sort((a, b) => a - b);
        } else {
          if (!state['output' + lowTargetNumber]) state['output' + lowTargetNumber] = [];
          state['output' + lowTargetNumber].push(lowValue);
        }

        if (highTarget === 'bot') {
          if (!state[highTargetNumber]) state[highTargetNumber] = [];
          state[highTargetNumber].push(highValue);
          state[highTargetNumber].sort((a, b) => a - b);
        } else {
          if (!state['output' + highTargetNumber]) state['output' + highTargetNumber] = [];
          state['output' + highTargetNumber].push(highValue);
        }
      }
    }
  });

  return finished;
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./10/input.txt')
});
lineReader.on('line', line => createInstructions(line));
lineReader.on('close', () => {
  createInitialState();

  let finished = false;
  while (!finished) {
    finished = executeInstructions();
  }

  console.log(state);
});
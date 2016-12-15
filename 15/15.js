const R = require('ramda');

const discs = {};
let indexes = [];

const parseLine = (line) => {
  const parts = line.split(' ');

  let discNum = parts[1].charAt(1);
  let length = parseInt(parts[3]);
  let startNum = parseInt(parts[11].charAt(0));

  let list = [startNum];
  let val = startNum;
  for (var i = 1; i < length; i++) {
    if (val + 1 > length - 1) {
      val = 0;
    } else {
      val++;
    }
    list.push(val);
  }

  discs[discNum] = list;
  indexes.push(0);
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./15/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  start();
})

const increaseIndexes = (indexes) => {
  return indexes.map((val, discNum) => {
    let length = discs[parseInt(discNum) + 1].length;

    // set the idx back to position 0
    if (val === length - 1) {
      val = 0;
    } else {
      val++;
    }

    return val;
  });
};

const getNthStepForward = (discNum, n) => {
  let currentIndex = indexes[discNum - 1];
  let length = discs[discNum].length;

  if ((currentIndex + n) > (length - 1)) {
    let diff = (currentIndex + n) - (length - 1) - 1;
    while (diff > length - 1) {
      diff = diff - length;
    }
    currentIndex = diff;
  } else {
    currentIndex += n;
  }

  return discs[discNum][currentIndex];
}

const isComplete = () => {
  let futureStates = indexes.map((val, discNum) => getNthStepForward(discNum + 1, discNum + 1));
  return R.all(R.equals(0))(futureStates);
}

const values = indexes => {
  return indexes.map((idx, discNum) => discs[discNum + 1][idx]);
}

const start = () => {
  let time = 0;

  while (!isComplete()) {
    indexes = increaseIndexes(indexes);

    time++;
  }

  console.log(time);
}
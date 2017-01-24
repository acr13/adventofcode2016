const fs  = require('fs');
const R = require('ramda');

let nodes = {};
let viablePairs = 0;

// create our node hashmap
fs.readFileSync('./22-input.txt').toString().split('\n').forEach(line => {
  if (line.indexOf('/dev/') !== -1) {
    let parts = R.pipe(
      R.split(' '),
      R.filter(x => x !== '')
    )(line.trim());

    let name = R.split('/', parts[0])[3].split('-');
    let nodeName = name[1].substr(1) + '-' + name[2].substr(1);

    nodes[nodeName] = {
      size: parseInt(parts[1]),
      used: parseInt(parts[2]),
      avail: parseInt(parts[3]),
      usePctg: parts[4],
    };
  }
});

R.keys(nodes).map(node => {
  if (nodes[node].used > 0) {
    R.keys(nodes).map(node2 => {
      if (node !== node2 && nodes[node].used <= nodes[node2].avail) {
        viablePairs++;
      }
    });
  }
});

console.log(viablePairs);

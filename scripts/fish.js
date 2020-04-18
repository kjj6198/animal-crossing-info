const fs = require('fs');
const fish = require('../data/fish.json');

Object.keys(fish).forEach((name) => {
  fish[name] = {
    ...fish[name],
    timeAppear: null,
    season: {
      north: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      south: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  };
});

fs.writeFileSync('./data/fish.json', JSON.stringify(fish));

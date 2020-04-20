// just for cleaning up my data

const fs = require('fs');
const insect = require('../public/data/insect.json');

Object.keys(insect).forEach((name, i) => {
  insect[name] = {
    ...insect[name],
    no: i + 1,
    icon: `/insectIcon/${name}.png`,
  };
});

fs.writeFileSync('./insect.json', JSON.stringify(insect));

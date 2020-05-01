// just for cleaning up my data

const fs = require('fs');
const insect = require('../public/data/insect-backup.json');
const no = require('../public/data/insect-no.json');

Object.keys(insect).forEach((name, i) => {
  insect[name] = {
    ...insect[name],
    icon: `/insectIcon/${name}.png`,
    no: no.find((insect) => insect.name === name).no,
  };
});

fs.writeFileSync('./insect.json', JSON.stringify(insect));

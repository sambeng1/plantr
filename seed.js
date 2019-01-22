const { db, Gardener, Plot, Vegetable } = require('./models');

const veggieData = [
  { name: 'carrot', color: 'orange', planted_on: Date() },
  { name: 'onion', color: 'yellow', planted_on: Date() }
];
const gardenerData = [{ name: 'Tom', age: 99 }, { name: 'Sam', age: 99 }];
const plotData = [{ size: 5, shaded: true }, { size: 7, shaded: false }];

db.sync({ force: true })
  .then(() => {
    console.log('it worked!');
    const veggiePromise = Vegetable.bulkCreate(veggieData, { returning: true });
    const gardenerPromise = Gardener.bulkCreate(gardenerData, {
      returning: true
    });
    const plotPromise = Plot.bulkCreate(plotData, { returning: true });

    return Promise.all([veggiePromise, gardenerPromise, plotPromise]);
  })
  // .then(seededStuff => {
  //   const [vegetable, gardener, plot] = seededStuff;
  //   const [name, color, planted_on] = vegetable;
  //   const [name, age] = gardener;
  //   const [size, shaded] = plot;
  // })
  .catch(err => {
    console.log('DISASTER!', err);
  })
  .finally(() => {
    db.close();
  });

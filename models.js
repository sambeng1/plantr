const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  favorite_veggie: { type: Sequelize.INTEGER, allowNull: false }
});

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
});

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
});

Plot.belongsTo(Gardener);

Vegetable.belongsToMany(Plot, { through: 'veggie_plot' });
Plot.belongsToMany(Vegetable, { through: 'veggie_plot' });

Gardener.belongsTo(Vegetable, { as: 'favorite_veggie' });

module.exports = { db, Gardener, Plot, Vegetable };

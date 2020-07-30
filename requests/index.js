const api = require("../helpers/api");
const config = require("./../config");

getFilms = () => {
  return api(`${config.swapi}/films`);
};

getPlanets = (url) => {
  return api(url);
};

getCharacters = (url) => {
  return api(url);
};

getSpecies = (url) => {
  return api(url);
};

getStarships = (url) => {
  return api(url);
};

module.exports = {
  getFilms,
  getPlanets,
  getCharacters,
  getSpecies,
  getStarships,
};

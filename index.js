const {
  getFilms,
  getPlanets,
  getCharacters,
  getSpecies,
  getStarships,
} = require("./requests");

const runAPI = async () => {
  const films = await getFilms();

  const response = { data: [] };

  for (film of films.results) {
    const data = {
      name: film.title,
    };
    for await (planet of film.planets) {
      const { name, terrain, gravity, diameter, population } = await getPlanets(
        planet
      );

      data["planets"] = [
        ...(data["planets"] || []),
        {
          name,
          terrain,
          gravity,
          diameter,
          population,
        },
      ];
    }

    for await (people of film.characters) {
      const {
        name,
        gender,
        hair_color,
        skin_color,
        eye_color,
        height,
        homeworld,
        species,
      } = await getCharacters(people);

      const { name: planetName } = await getPlanets(homeworld);

      var newSpeciesData = [];
      for await (speciesObj of species) {
        const { name, average_height, language } = await getSpecies(speciesObj);
        newSpeciesData = [
          ...newSpeciesData,
          { name, average_height, language },
        ];
      }

      data["people"] = [
        ...(data["people"] || []),
        {
          name,
          gender,
          hair_color,
          skin_color,
          eye_color,
          height,
          homeworld: planetName,
          species: newSpeciesData,
        },
      ];
    }

    for await (ship of film.starships) {
      const { name, model, manufactuer, passengers } = await getStarships(ship);

      data["starships"] = [
        ...(data["starships"] || []),
        { name, model, manufactuer, passengers },
      ];
    }

    response.data.push({ ...data });
    console.log(JSON.stringify(data));
  }

  console.log(JSON.stringify(response));
};

runAPI();

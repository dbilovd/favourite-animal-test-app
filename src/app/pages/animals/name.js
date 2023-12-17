"use client";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [favouriteAnimals, setFavouriteAnimals] = useState([]);

  const refreshListOfAnimals = useCallback(() => {
    if (typeof window !== "undefined") {
      let savedAnimals = JSON.parse(
        localStorage.getItem("favourite_animals") || "{}"
      );
      setFavouriteAnimals(savedAnimals);
    }
  }, []);

  const addAnimalToFavourites = (animal) => {
    let key = animal.name;

    if (typeof window !== "undefined") {
      let savedListOfFavouriteAnimals = JSON.parse(
        localStorage.getItem("favourite_animals") || "{}"
      );

      if (!savedListOfFavouriteAnimals.hasOwnProperty("key")) {
        savedListOfFavouriteAnimals[key] = null;
      }

      // setFavouriteAnimals({
      //   ...favouriteAnimals,
      //   [key]: animal,
      // })

      savedListOfFavouriteAnimals[key] = animal;
      localStorage.setItem(
        "favourite_animals",
        JSON.stringify(savedListOfFavouriteAnimals)
      );

      // refreshListOfAnimals();
    }
  };

  const searchForAnimal = async () => {
    if (!search) {
      return;
    }

    const searchAnimalRequest = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${search}`,
      {
        headers: {
          "X-Api-Key": "gld2rjsTgi9QWi3i9JsoYQ==zPtPSOidt03NOcDe",
        },
      }
    );
    const matchingAnimals = await searchAnimalRequest.json();
    console.log({ matchingAnimals });
    setAnimals(matchingAnimals);
  };

  const favouriteAnimalsList = () => {
    return Object.values(favouriteAnimals);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedAnimals = JSON.parse(
        localStorage.getItem("favourite_animals") || "{}"
      );
      setFavouriteAnimals(savedAnimals);
    }

    return () => {
      setFavouriteAnimals({});
    };
  }, []);

  return (
    <div>
      <h1>List of Favourite Animals</h1>
      <div>
        {favouriteAnimalsList().map((animal, animalIndex) => (
          <div key={animalIndex}>
            <h3>{animal.name}</h3>
            <button onClick={addAnimalToFavourites(animal)}>
              Remove from Favourite
            </button>
            <hr />
          </div>
        ))}
      </div>

      <h1>Search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchForAnimal}>Search for Animal</button>

      <h1>List of Animals</h1>
      <div>
        {animals.map((animal, animalIndex) => (
          <div key={animalIndex}>
            <h3>{animal.name}</h3>
            <button onClick={() => addAnimalToFavourites(animal)}>
              Add to Favourite
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

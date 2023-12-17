"use client";

import { useCallback, useEffect, useState } from "react";
import AnimalDetails from "./components/AnimalDetails";
import Animals from "./components/Animals";
import { getAnimals } from "./services/api";
import { fetchFavouriteAnimals, saveFavouriteAnimals } from "./services/data";

export default function Home() {
  const [search, setSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [activeAnimal, setActiveAnimal] = useState(null);
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
    const newFavourites = {
      ...favouriteAnimals,
      [animal.name]: animal
    }

    setFavouriteAnimals(newFavourites)
    saveFavouriteAnimals(newFavourites)
  };

  const removeAnimalFromFavourites = (animal) => {
    let newFavourites = {
      ...favouriteAnimals,
    }

    delete newFavourites[animal.name]

    setFavouriteAnimals(newFavourites)
    saveFavouriteAnimals(newFavourites)
  };

  const searchForAnimal = async () => {
    if (!search) {
      return;
    }

    setAnimals(await getAnimals(search) ?? []);
  };

  const favouriteAnimalsList = () => {
    return Object.values(favouriteAnimals);
  };

  useEffect(() => {
    setFavouriteAnimals(
      fetchFavouriteAnimals()
    )

    return () => {
      setFavouriteAnimals({});
    };
  }, []);

  return (
    <div>
      <header>
        <div class="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-semibold leading-tight text-gray-900">
            Favourite Animal
          </h1>
        </div>
      </header>

      <div
        class="mt-10 pb-6 max-w-7xl mx-auto sm:space-x-6 lg:space-x-8 px-4 sm:px-6 lg:px-8
        flex flex-col md:flex-row md:items-top md:justify-between"
      >
        <div class="w-full md:w-2/3 order-last md:order-first">
          <div className="flex items-center justify-start gap-x-4 mb-10">
            <input
              placeholder="Enter name of animal"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={searchForAnimal}
              className="rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Search
            </button>
          </div>

          <Animals
            title={animals.length ? 'Matching Animals' : false}
            animals={animals}
            actions={[
              {
                title: "View",
                handler: setActiveAnimal,
              },
              {
                title: "Favourite",
                handler: addAnimalToFavourites,
              },
            ]}
          />

          {!!activeAnimal && (
            <AnimalDetails
              animal={activeAnimal}
              closeDialog={() => setActiveAnimal(null)}
            />
          )}
        </div>

        <div class="w-full md:w-1/3 order-first md:order-last">
          <Animals
            title="Your Favourite Animals"
            animals={favouriteAnimalsList()}
            actions={[
              {
                title: "View",
                handler: setActiveAnimal,
              },
              {
                title: "Unfavourite",
                handler: removeAnimalFromFavourites,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

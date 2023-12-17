"use client";

import { useEffect, useState } from "react";
import { fetchRatingsByAnimal, saveRatings } from "../services/data";

export default function AnimalDetails({ animal, closeDialog }) {
  const [activeLikes, setActiveLikes] = useState([]);
  const [activeDislikes, setActiveDislikes] = useState([]);
  const [activeRating, setActiveRating] = useState(0);

  const addLike = (character) => {
    setActiveLikes([...activeLikes, character]);
  };

  const addDislike = (character) => {
    setActiveDislikes([...activeDislikes, character]);
  };

  const saveActiveAnimalRating = () => {
    let ratings = {
      rating: activeRating,
      likes: activeLikes,
      dislikes: activeDislikes,
    };

    saveRatings(animal?.name, ratings);
  };

  const isLiked = (character) => {
    return activeLikes.includes(character);
  };

  const isDisliked = (character) => {
    return activeDislikes.includes(character);
  };

  useEffect(() => {
    let animalRating = fetchRatingsByAnimal(animal.name);
    setActiveRating(animalRating?.rating || 0);
    setActiveDislikes(animalRating?.dislikes || []);
    setActiveLikes(animalRating?.likes || []);

    return () => {
      setActiveRating(0);
      setActiveDislikes([]);
      setActiveLikes([]);
    };
  }, [animal]);

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75">
      <div className="relative w-11/12 h-5/6 max-h-5/6 mx-auto mt-24">
        <button
          onClick={() => closeDialog()}
          className="absolute top-2 right-2 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Close
        </button>
        <div className="bg-white w-full h-full overflow-auto align-middle p-12 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold leading-tight text-gray-800">
                {animal.name}
              </h1>
              <p>
                Found in:
                <span className="ml-2 capitalize">
                  {animal.locations.join(", ")}
                </span>
              </p>
            </div>
            <div>
              <input
                className="inline-block w-auto px-3 py-2 bg-white border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                type="number"
                min={0}
                max={5}
                step={1}
                value={activeRating}
                onChange={(e) => setActiveRating(e.target.value)}
              />
              <button
                onClick={(e) => saveActiveAnimalRating()}
                className="ml-2 rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Save Rating
              </button>
            </div>
          </div>

          <table class="table-fixed my-10">
            <thead>
              <tr>
                <th className="text-left text-md font-semibold w-1/5 pr-3">
                  Attribute
                </th>
                <th className="text-left text-md font-semibold w-3/5 px-3">
                  Details
                </th>
                <th className="text-center text-md font-semibold w-1/5 pl-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(animal.characteristics).map((characterKey) => (
                <tr key={characterKey}>
                  <td className="text-left pr-3 capitalize pb-5">
                    {String(characterKey).replaceAll("_", " ")}
                  </td>
                  <td className="text-left px-3">
                    {animal.characteristics[characterKey]}
                  </td>
                  <td className="text-center">
                    {isLiked(characterKey) ? (
                      <span>Liked</span>
                    ) : (
                      <button
                        onClick={() => addLike(characterKey)}
                        className="rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Like
                      </button>
                    )}
                    {isDisliked(characterKey) ? (
                      <span>Disliked</span>
                    ) : (
                      <button
                        onClick={() => addDislike(characterKey)}
                        className="ml-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Dislike
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

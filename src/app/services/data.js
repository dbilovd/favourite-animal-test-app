export function fetchFavouriteAnimals() {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(localStorage.getItem("favourite_animals") || "{}");
}

export function saveFavouriteAnimals(animals) {
  if (typeof window === "undefined") {
    return false;
  }

  localStorage.setItem("favourite_animals", JSON.stringify(animals));
}

export function fetchRatingsByAnimal(name) {
  if (typeof window === "undefined") {
    return [];
  }

  const animals = JSON.parse(localStorage.getItem("animal_ratings") || "{}");
  return animals[name] || false
}

export function saveRatings(name, rating) {
  if (typeof window === "undefined") {
    return false;
  }

  let existingRatings = JSON.parse(
    localStorage.getItem("animal_ratings") || "{}"
  );

  if (!existingRatings.hasOwnProperty(name)) {
    existingRatings[name] = null;
  }

  console.log({ rating })
  existingRatings[name] = rating;

  localStorage.setItem("animal_ratings", JSON.stringify(existingRatings));
}

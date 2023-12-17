
export const getAnimals = async (search) => {
  if (!search) {
    return [];
  }

  const request = await fetch(
    `https://api.api-ninjas.com/v1/animals?name=${search}`,
    {
      headers: {
        "X-Api-Key": "gld2rjsTgi9QWi3i9JsoYQ==zPtPSOidt03NOcDe",
      },
    }
  );

  return await request.json();
};

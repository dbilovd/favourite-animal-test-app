"use client";

export default function Animals({ title, animals = [], actions = [] }) {
  return (
    <>
      {
        title && (
          <h1 className="text-xl font-bold text-gray-800">
            {title}
          </h1>
        )
      }

      <ul className="divide-y divide-gray-100">
        {animals.map((animal, animalIndex) => (
          <li
            key={animalIndex}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <h3>{animal.name}</h3>
            <div className="flex items-center justify-end gap-x-2">
              {
                actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => action.handler ? action.handler(animal) : false }
                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {action.title}
                  </button>
                ))
              }
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

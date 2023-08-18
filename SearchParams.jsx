import { useEffect, useState } from "react";
import { Results } from "./Results";
import { useBreedList } from "./useBreedList";

function SearchParams() {
  const [location, setLocation] = useState("");
  const TYPES = ["cat", "dog", "bird"];
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${type}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  useEffect(() => {
    requestPets();
  }, []);

  const { breedList: breeds, status } = useBreedList(type);

  console.log("rerendered");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">location</label>
        <input
          id="location"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label htmlFor="type">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">-</option>
            {TYPES.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <br />
        {status}
        <label htmlFor="breed">
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="">-</option>
            {breeds.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">submit</button>
      </form>
      {<Results pets={pets} />}
    </div>
  );
}

export default SearchParams;

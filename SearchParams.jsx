import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSearch } from "./fetchSearch";
import { Results } from "./Results";
import { useBreedList } from "./useBreedList";

function SearchParams() {
  const TYPES = ["cat", "dog", "bird"];
  const [type, setType] = useState("");

  const [searchParams, setSearchParams] = useState({
    type: "",
    location: "",
    breed: "",
  });
  const searchResult = useQuery(["search", searchParams], fetchSearch);
  const pets = searchResult?.data?.pets ?? [];

  const { breedList: breeds, status } = useBreedList(type);

  console.log("rerendered");

  if (searchResult.isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setSearchParams({
            type: formData.get("type") || "",
            breed: formData.get("breed") || "",
            location: formData.get("location") || "",
          });
        }}
      >
        <label htmlFor="location">location</label>
        <input id="location" placeholder="location" name="location" />
        <br />
        <label htmlFor="type">
          <select
            id="type"
            name="type"
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
          <select id="breed" name="breed">
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

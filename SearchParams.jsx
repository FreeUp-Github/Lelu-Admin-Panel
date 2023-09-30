/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  useDeferredValue,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AdoptedPetContext } from "./AdoptedPetContext";
import { fetchSearch } from "./fetchSearch";
import { Results } from "./Results";
import { useBreedList } from "./useBreedList";
import Button from "@mui/material/Button";

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
  const deferredValue = useDeferredValue(pets);
  const results = useMemo(
    () => <Results pets={deferredValue} />,
    [deferredValue]
  );

  const { breedList: breeds, status } = useBreedList(type);

  const [adoptedPet] = useContext(AdoptedPetContext);

  // function logMe() {
  //   console.log("this is me", type);
  // }

  // useMemo(logMe, [type]);

  // const [width, setWidth] = useState(0);
  // const wrapperRef = useRef();
  // useEffect(() => {
  //   console.log("use effect", wrapperRef.current?.clientWidth);
  //   // setWidth(wrapperRef.current?.clientWidth);
  // });
  // useLayoutEffect(() => {
  //   console.log("use layout effect", wrapperRef.current?.clientWidth);
  //   setWidth(wrapperRef.current?.clientWidth);
  // });
  // useEffect(() => console.log({ width }), [width]);

  if (searchResult.isLoading) {
    return <h1>loading</h1>;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
    // ref={wrapperRef}
    >
      <Button>شسیب</Button>
      adopted:
      {adoptedPet ? (
        <img
          src={adoptedPet.images[0]}
          alt="adopted pet"
          width="100px"
          height="100px"
        />
      ) : (
        "not yet"
      )}
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
      {results}
    </div>
  );
}

export default SearchParams;

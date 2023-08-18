import { useEffect, useState } from "react";

const localStorage = {};
export function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");
  useEffect(() => {
    console.log("breedlist effect");
    if (!animal) {
      setBreedList([]);
    } else if (localStorage[animal]) {
      setBreedList(localStorage[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localStorage[animal] = json.breeds || [];
      setBreedList(localStorage[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return {
    breedList,
    status
  };
}

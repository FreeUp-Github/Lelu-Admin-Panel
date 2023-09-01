import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "./fetchBreeds";

export function useBreedList(animal) {
  const result = useQuery(["breeds", animal], fetchBreeds);
  return {
    breedList: result?.data?.breeds ?? []
  };
}

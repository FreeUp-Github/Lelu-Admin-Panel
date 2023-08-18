import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Carousel } from "./Carousel";
import { fetchPet } from "./fetchPet";

function Detail() {
  const { id } = useParams();
  const result = useQuery(["detail", id], fetchPet);

  if (result.isLoading) {
    return <h1>it is loading ⚽️</h1>;
  }
  const pet = result.data.pets[0];

  return (
    <div>
      <Carousel images={pet.images} />
      <h1>name: {pet.name}</h1>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
      </h2>
      <p>{pet.description}</p>
    </div>
  );
}

export function DetailErrorBoundary() {
  return <Detail></Detail>;
}

export { DetailErrorBoundary as Detail };

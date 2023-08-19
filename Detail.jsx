import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdoptedPetContext } from "./AdoptedPetContext";
import { Carousel } from "./Carousel";
import { fetchPet } from "./fetchPet";
import { Modal } from "./Modal";

function Detail() {
  const { id } = useParams();
  const result = useQuery(["detail", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const navigate = useNavigate();

  if (result.isLoading) {
    return <h1>it is loading ⚽️</h1>;
  }
  const pet = result.data.pets[0];

  return (
    <div>
      <Carousel images={pet.images} />
      <button onClick={() => setShowModal(true)}>name: {pet.name}</button>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
      </h2>
      <p>{pet.description}</p>
      {showModal ? (
        <Modal>
          <p>do you adopt {pet.name}?</p>
          <button
            onClick={() => {
              setAdoptedPet(pet);
              navigate("/");
            }}
          >
            yes
          </button>
          <button onClick={() => setShowModal(false)}>no</button>
        </Modal>
      ) : null}
    </div>
  );
}

export function DetailErrorBoundary() {
  return <Detail></Detail>;
}

export { DetailErrorBoundary as Detail };

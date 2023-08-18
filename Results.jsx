import Pet from "./Pet";

export function Results({ pets }) {
  return pets.length === 0 ? (
    <span>not found</span>
  ) : (
    pets.map((pet) => (
      <Pet {...pet} key={pet.id} location={`${pet.city} - ${pet.state}`} />
    ))
  );
}

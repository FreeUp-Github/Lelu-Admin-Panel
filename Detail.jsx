import { useParams } from "react-router-dom";

export function Detail() {
  const { id } = useParams();
  return <div>detail: {id}</div>;
}

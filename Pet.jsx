// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.type),
//   ]);
// };

import { Link } from "react-router-dom";

const Pet = (props) => {
  return (
    <Link to={`/detail/${props.id}`}>
      <img
        src={props.images?.[0]}
        alt={props.name}
        width="50px"
        height="50px"
      />
      <h1>{props.name}</h1>
      <h2>{props.type}</h2>
    </Link>
  );
};

export default Pet;

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.type),
//   ]);
// };

const Pet = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.type}</h2>
    </div>
  );
};

export default Pet;

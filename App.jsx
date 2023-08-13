import ReactDOM from "react-dom/client";
import Pet from "./Pet";
import SearchParams from "./SearchParams";

const App = () => {
  console.log("rerendered");
  return (
    <div>
      <h1>Adopt me!</h1>
      <SearchParams />
      <Pet name="a" type="dog" />
      <Pet name="b" type="cat" />
      <Pet name="c" type="rabbit" />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

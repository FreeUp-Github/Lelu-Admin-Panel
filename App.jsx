import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Detail } from "./Detail";
// import Pet from "./Pet";
import SearchParams from "./SearchParams";

const App = () => {
  console.log("rerendered");
  return (
    <BrowserRouter>
      {/* <Pet name="a" type="dog" />
      <Pet name="b" type="cat" />
      <Pet name="c" type="rabbit" /> */}
      <Link to="/">home</Link>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

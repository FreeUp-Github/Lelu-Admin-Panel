import React from 'react';
import ReactDOM from 'react-dom/client'
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.type),
  ]);
};

const App = () =>
  React.createElement(
    "div",
    {},
    React.createElement(
      "h1",
      {},
      "Adopt me!",
      React.createElement(Pet, {
        name: "a",
        type: "dog",
      }),
      React.createElement(Pet, {
        name: "b",
        type: "cat",
      }),
      React.createElement(Pet, {
        name: "c",
        type: "rabbit",
      })
    )
  );

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));

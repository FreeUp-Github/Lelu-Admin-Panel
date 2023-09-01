var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Component, useRef, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { A as AdoptedPetContext } from "../ServerApp.js";
import { createPortal } from "react-dom";
import "react-dom/server";
import "react-router-dom/server.mjs";
class Carousel extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      active: 0
    });
  }
  render() {
    const images = this.props.images;
    const activeIdx = this.state.active;
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        "img",
        {
          src: images[activeIdx],
          width: "200px",
          height: "200px",
          alt: "active"
        }
      ) }),
      images.map((img, idx) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => this.setState({
              active: idx
            }),
            role: "img",
            children: [
              /* @__PURE__ */ jsx("div", { children: idx === activeIdx ? "active" : "" }),
              /* @__PURE__ */ jsx("img", { src: img, alt: "thumbnail", width: "50px", height: "50px" })
            ]
          },
          img
        )
      ))
    ] });
  }
}
async function fetchPet({ queryKey }) {
  const id = queryKey[1];
  const apiRes = await fetch("http://pets-v2.dev-apis.com/pets?id=" + id);
  if (!apiRes.ok) {
    throw new Error("fetch detail with id: " + id + " is not ok");
  }
  return apiRes.json();
}
function Modal({ children }) {
  const modal = useRef(null);
  if (modal.current === null) {
    modal.current = document.createElement("div");
    modal.current.classList.add("modal");
  }
  useEffect(() => {
    const root = document.getElementById("modals");
    root.appendChild(modal.current);
    return () => root.removeChild(modal.current);
  }, []);
  return createPortal(children, modal.current);
}
function Detail() {
  const { id } = useParams();
  const result = useQuery(["detail", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();
  if (result.isLoading) {
    return /* @__PURE__ */ jsx("h1", { children: "it is loading ⚽️" });
  }
  const pet = result.data.pets[0];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Carousel, { images: pet.images }),
    /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), children: [
      "name: ",
      pet.name
    ] }),
    /* @__PURE__ */ jsxs("h2", { children: [
      pet.animal,
      " - ",
      pet.breed,
      " - ",
      pet.city,
      " - ",
      pet.state
    ] }),
    /* @__PURE__ */ jsx("p", { children: pet.description }),
    showModal ? /* @__PURE__ */ jsxs(Modal, { children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "do you adopt ",
        pet.name,
        "?"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setAdoptedPet(pet);
            navigate("/");
          },
          children: "yes"
        }
      ),
      /* @__PURE__ */ jsx("button", { onClick: () => setShowModal(false), children: "no" })
    ] }) : null
  ] });
}
function DetailErrorBoundary() {
  return /* @__PURE__ */ jsx(Detail, {});
}
export {
  DetailErrorBoundary as Detail,
  DetailErrorBoundary,
  DetailErrorBoundary as default
};

import { jsxs, jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { createElement, useState, useContext } from "react";
import { A as AdoptedPetContext } from "../ServerApp.js";
import { Link } from "react-router-dom";
import "react-dom/server";
import "react-router-dom/server.mjs";
async function fetchSearch({ queryKey }) {
  const { type, location, breed } = queryKey[1];
  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${type}&location=${location}&breed=${breed}`
  );
  if (!apiRes.ok) {
    throw new Error(
      `fetch search with ${type}, ${location}, ${breed} is not ok`
    );
  }
  return apiRes.json();
}
const Pet = (props) => {
  var _a;
  return /* @__PURE__ */ jsxs(Link, { to: `/detail/${props.id}`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: (_a = props.images) == null ? void 0 : _a[0],
        alt: props.name,
        width: "50px",
        height: "50px"
      }
    ),
    /* @__PURE__ */ jsx("h1", { children: props.name }),
    /* @__PURE__ */ jsx("h2", { children: props.type })
  ] });
};
function Results({ pets }) {
  return pets.length === 0 ? /* @__PURE__ */ jsx("span", { children: "not found" }) : pets.map((pet) => /* @__PURE__ */ createElement(Pet, { ...pet, key: pet.id, location: `${pet.city} - ${pet.state}` }));
}
async function fetchBreeds({ queryKey }) {
  const animal = queryKey[1];
  if (!animal) {
    return [];
  }
  const apiRes = await fetch(
    "http://pets-v2.dev-apis.com/breeds?animal=" + animal
  );
  if (!apiRes.ok) {
    throw new Error("fetch breeds with animal: " + animal + " is not ok");
  }
  return apiRes.json();
}
function useBreedList(animal) {
  var _a;
  const result = useQuery(["breeds", animal], fetchBreeds);
  return {
    breedList: ((_a = result == null ? void 0 : result.data) == null ? void 0 : _a.breeds) ?? []
  };
}
function SearchParams() {
  var _a;
  const TYPES = ["cat", "dog", "bird"];
  const [type, setType] = useState("");
  const [searchParams, setSearchParams] = useState({
    type: "",
    location: "",
    breed: ""
  });
  const searchResult = useQuery(["search", searchParams], fetchSearch);
  const pets = ((_a = searchResult == null ? void 0 : searchResult.data) == null ? void 0 : _a.pets) ?? [];
  const { breedList: breeds, status } = useBreedList(type);
  const [adoptedPet] = useContext(AdoptedPetContext);
  if (searchResult.isLoading) {
    return /* @__PURE__ */ jsx("h1", { children: "loading" });
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    /* @__PURE__ */ jsxs(
      "div",
      {
        children: [
          "adopted:",
          adoptedPet ? /* @__PURE__ */ jsx(
            "img",
            {
              src: adoptedPet.images[0],
              alt: "adopted pet",
              width: "100px",
              height: "100px"
            }
          ) : "not yet",
          /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                setSearchParams({
                  type: formData.get("type") || "",
                  breed: formData.get("breed") || "",
                  location: formData.get("location") || ""
                });
              },
              children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "location", children: "location" }),
                /* @__PURE__ */ jsx("input", { id: "location", placeholder: "location", name: "location" }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("label", { htmlFor: "type", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "type",
                    name: "type",
                    value: type,
                    onChange: (e) => setType(e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "-" }),
                      TYPES.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("br", {}),
                status,
                /* @__PURE__ */ jsx("label", { htmlFor: "breed", children: /* @__PURE__ */ jsxs("select", { id: "breed", name: "breed", children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-" }),
                  breeds.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
                ] }) }),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("button", { type: "submit", children: "submit" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Results, { pets })
        ]
      }
    )
  );
}
export {
  SearchParams as default
};

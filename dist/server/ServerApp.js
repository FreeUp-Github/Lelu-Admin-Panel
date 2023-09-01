var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsxs, jsx } from "react/jsx-runtime";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Component, createContext, lazy, useState, Suspense } from "react";
class ErrorBoundary extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      hasError: false
    });
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: "home" }),
        /* @__PURE__ */ jsx("h1", { children: "hey you have error" })
      ] });
    }
    return this.props.children;
  }
}
const AdoptedPetContext = createContext();
const Detail = lazy(() => import("./assets/Detail-fe73c410.js"));
const SearchParams = lazy(() => import("./assets/SearchParams-bfe83ba8.js"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});
const App = () => {
  const adoptedPetHook = useState(null);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AdoptedPetContext.Provider, { value: adoptedPetHook, children: /* @__PURE__ */ jsxs(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "loading" }) }),
      children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: "home" }),
        /* @__PURE__ */ jsxs(Routes, { children: [
          /* @__PURE__ */ jsx(Route, { path: "/detail/:id", element: /* @__PURE__ */ jsx(Detail, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(SearchParams, {}) })
        ] })
      ]
    }
  ) }) }) });
};
function render(url, options) {
  const stream = renderToPipeableStream(
    /* @__PURE__ */ jsx(StaticRouter, { children: /* @__PURE__ */ jsx(App, {}) }),
    options
  );
  return stream;
}
export {
  AdoptedPetContext as A,
  render as default
};

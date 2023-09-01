import { Link, Route, Routes } from "react-router-dom";
// import Pet from "./Pet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { AdoptedPetContext } from "./AdoptedPetContext";
import { lazy, Suspense, useState } from "react";

const Detail = lazy(() => import("./Detail"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  const adoptedPetHook = useState(null);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          <Suspense
            fallback={
              <div>
                <h1>loading</h1>
              </div>
            }
          >
            <Link to="/">home</Link>
            <Routes>
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

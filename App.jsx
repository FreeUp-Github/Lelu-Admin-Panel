import { Link, Route, Routes } from "react-router-dom";
// import Pet from "./Pet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { AdoptedPetContext } from "./AdoptedPetContext";
import { lazy, Suspense, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignUp from "./pages/SignUp";
import { Container } from "@mui/material";
import SignIn from "./pages/SignIn";
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
    <Container>
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
              {/* <Link to="/">home</Link> */}
              <Routes>
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/" element={<SearchParams />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Routes>
            </Suspense>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Container>
  );
};

export default App;

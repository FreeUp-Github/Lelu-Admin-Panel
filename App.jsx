import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";

// import Pet from "./Pet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignUp from "./pages/SignUp";
import { Container } from "@mui/material";
import SignIn from "./pages/SignIn";
import GlobalErrorHandler from "./components/general/GlobalErrorHandler";
import AdminPanelLayout from "./layouts/AdminPanelLayout.jsx";
import Rooms from "./pages/AdminPanel/Rooms";
import { Room } from "./pages/AdminPanel/Room";
import { AuthProvider } from "./core/auth/AuthProvider";
import { RequireAuth } from "./core/auth/RequireAuth";
import { Index } from "./pages/Index";
import { RedirectAuthenticated } from "./core/auth/RedirectAuthenticated";
import { RoomDetail } from "./pages/AdminPanel/RoomDetail";
import { ResetPassword } from "./pages/ResetPassword";
import { UserIndex } from "./pages/User/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <div>
      <AuthProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div>
                  <h1>loading</h1>
                </div>
              }
            >
              <GlobalErrorHandler />
              {/* <Link to="/">home</Link> */}
              <Routes>
                <Route path="/user/:roomId" element={<UserIndex />} />

                <Route
                  path="/sign-up"
                  element={
                    <RedirectAuthenticated>
                      <SignUp />
                    </RedirectAuthenticated>
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <RedirectAuthenticated>
                      <SignIn />
                    </RedirectAuthenticated>
                  }
                />
                <Route
                  path="/reset"
                  element={
                    <RedirectAuthenticated>
                      <ResetPassword />
                    </RedirectAuthenticated>
                  }
                />
                <Route
                  path="/panel"
                  element={
                    <RequireAuth>
                      <AdminPanelLayout />
                    </RequireAuth>
                  }
                >
                  <Route path="rooms" element={<Rooms />} />
                  <Route path="rooms/:roomId" element={<Room />} />
                  <Route
                    path="rooms/:roomId/detail/:chatId"
                    element={<RoomDetail />}
                  />
                  {/* <Route
                  path="*"
                  handle={(...args) => {
                    console.log({ args });
                  }}
                /> */}
                </Route>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<div>not found</div>}>
                  {/* <Route path="rooms" element={<Rooms />} /> */}
                </Route>
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </ErrorBoundary>
      </AuthProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

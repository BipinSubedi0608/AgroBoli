import { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import HomePage from "./views/HomePage/HomePage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/LoginPage/RegisterPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ErrorPage from "./views/Shared/ErrorPage";
import { LoadingIndicator } from "./views/Shared/LoadingIndicator";
import { NavBar } from "./views/Shared/Navbar";
import SingleProductPage from "./views/SingleProductPage/SingleProductPage";
import UserDetailsPage from "./views/UserDetailsPage/UserDetailsPage";

type RouteType = { pathname: string; element: JSX.Element };

const routes: RouteType[] = [
  {
    pathname: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    pathname: "/home",
    element: <Navigate to="/" />,
  },
  {
    pathname: "/login",
    element: <LoginPage />,
  },
  {
    pathname: "/register",
    element: <RegisterPage />,
  },
  {
    pathname: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    pathname: "/products/:productId",
    element: (
      <ProtectedRoute>
        <SingleProductPage />
      </ProtectedRoute>
    ),
  },
  {
    pathname: "/users/:userId",
    element: (
      <ProtectedRoute>
        <UserDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    pathname: "*",
    element: <ErrorPage />,
  },
];

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="mb-[6rem]">
          <NavBar />
        </div>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.pathname} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import store from "./store/index";
import { AuthVerify, getUserRole } from "./auth/auth";

import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Admin from "./pages/Admin";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Shows from "./pages/Shows";
import Show from "./pages/Show";
import ShowSeason from "./pages/ShowSeason";
import ShowEpisode from "./pages/ShowEpisode";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import FriendsProfile from "./pages/FriendsProfile";
import Trivia from "./pages/Trivia";
import UsersTrivia from "./pages/UsersTrivia";
import UsersTriviaHistory from "./pages/UsersTriviaHistory";

function App() {
  const [token, setToken] = useState(localStorage.getItem("cinema-hub-token"));

  const handleLogin = (token) => {
    localStorage.setItem("cinema-hub-token", token);
    setToken(token);
  };

  AuthVerify(token);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header token={token} />
            <main className="flex-grow flex flex-col justify-center items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<Movie />} />
                <Route path="/about" element={<About />} />
                <Route path="/shows" element={<Shows />} />
                <Route path="/shows/:id" element={<Show />} />
                <Route
                  path="/shows/:id/season/:season"
                  element={<ShowSeason />}
                />
                <Route
                  path="/shows/:id/season/:season/episode/:episode"
                  element={<ShowEpisode />}
                />
                <Route element={<ProtectedRoute token={token} />}>
                  <Route path="/profile" element={<Profile token={token} />} />
                  <Route path="/friend/:id" element={<FriendsProfile />} />
                  <Route path="/trivia" element={<Trivia />} />
                  <Route
                    path="/trivia/trivia-history"
                    element={<UsersTrivia />}
                  />
                  <Route
                    path="/trivia/trivia-history/:id"
                    element={<UsersTriviaHistory />}
                  />
                </Route>
                <Route element={<AdminRoute token={token} />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

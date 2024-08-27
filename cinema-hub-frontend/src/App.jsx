import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http";
import { Provider } from "react-redux";
import store from "./store/index";

import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
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

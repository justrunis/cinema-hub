import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http";

import Header from "./components/UI/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Shows from "./pages/Shows";
import Show from "./pages/Show";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <main className="flex flex-col min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<Movie />} />
              <Route path="/about" element={<About />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/shows/:id" element={<Show />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

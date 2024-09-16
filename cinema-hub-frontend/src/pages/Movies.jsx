import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingMovies,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../api/http";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";
import { STALE_TIME } from "../utils/constants";
import MovieCard from "../components/Movies/MovieCard";
import SearchBar from "../components/UI/SearchBar";
import { useEffect, useState } from "react";
import Button from "../components/UI/Button";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaPlay, FaRegStar, FaRegCalendarAlt } from "react-icons/fa";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentQuery = searchParams.get("query") || "";
  const currentFunction = searchParams.get("function") || "trending";

  const [queryFunction, setQueryFunction] = useState("trending");

  document.title = "Movies";

  useEffect(() => {
    if (queryFunction !== currentFunction) {
      setSearchParams({
        page: "1",
        query: currentQuery,
        function: queryFunction,
      });
    }
  }, [queryFunction, currentFunction]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", currentPage, currentQuery, queryFunction],
    queryFn: ({ signal }) =>
      queryFunction === "trending"
        ? fetchTrendingMovies({ currentPage, signal, query: currentQuery })
        : queryFunction === "now_playing"
        ? fetchNowPlayingMovies({ currentPage, signal, query: currentQuery })
        : queryFunction === "top_rated"
        ? fetchTopRatedMovies({ currentPage, signal, query: currentQuery })
        : fetchUpcomingMovies({ currentPage, signal, query: currentQuery }),

    staleTime: STALE_TIME,
  });

  const handlePageChange = (page) => {
    const newParams = { page: page.toString() };
    if (currentQuery) {
      newParams.query = currentQuery;
    }
    setSearchParams(newParams);
  };

  const handleSearch = (query) => {
    const newParams = { page: "1" };
    if (currentQuery !== query) {
      newParams.query = query;
      setSearchParams(newParams);
    }
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex justify-center p-6">
        <ErrorIndicator
          title="Failed to fetch movies"
          message={error?.message || "An unknown error occurred"}
        />
      </div>
    );
  }

  const buttonStyle =
    "btn btn-primary text-primary-content shadow-lg text-sm md:text-base py-1 px-2 md:py-2 md:px-4";

  return (
    <>
      <div className="container flex flex-col items-center justify-center mx-auto bg-base-200 rounded-lg mt-5 p-4">
        <SearchBar
          onSearch={handleSearch}
          className="p-4"
          placeHolder="Search Movies..."
          value={currentQuery}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-center gap-2 p-2 md:gap-4 md:p-4">
          <Button
            className={`${buttonStyle} ${
              queryFunction === "trending" ? "text-gray-900" : ""
            }`}
            onClick={() => setQueryFunction("trending")}
          >
            Trending
            <FaArrowTrendUp className="inline-block ml-1" />
          </Button>
          <Button
            className={`${buttonStyle} ${
              queryFunction === "now_playing" ? "text-gray-900" : ""
            }`}
            onClick={() => setQueryFunction("now_playing")}
          >
            Now Playing
            <FaPlay className="inline-block ml-1" />
          </Button>
          <Button
            className={`${buttonStyle} ${
              queryFunction === "top_rated" ? "text-gray-900" : ""
            }`}
            onClick={() => setQueryFunction("top_rated")}
          >
            Top Rated
            <FaRegStar className="inline-block ml-1" />
          </Button>
          <Button
            className={`${buttonStyle} ${
              queryFunction === "upcoming" ? "text-gray-900" : ""
            }`}
            onClick={() => setQueryFunction("upcoming")}
          >
            Upcoming
            <FaRegCalendarAlt className="inline-block ml-1" />
          </Button>
        </div>
      </div>
      {data?.results.length === 0 ? (
        <div className="flex items-center mt-4 justify-center text-center text-primary font-bold">
          <p>No movies found for the query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 p-4">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center p-6">
            <Pager
              totalPages={data?.total_pages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}

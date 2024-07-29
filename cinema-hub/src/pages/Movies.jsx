import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "../api/http";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";
import { STALE_TIME } from "../utils/constants";
import MovieCard from "../components/Movies/MovieCard";
import SearchBar from "../components/UI/SearchBar";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentQuery = searchParams.get("query") || "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", currentPage, currentQuery],
    queryFn: ({ signal }) =>
      fetchTrendingMovies({
        currentPage,
        signal,
        query: currentQuery,
      }),
    staleTime: STALE_TIME,
  });

  const handlePageChange = (page) => {
    const newParams = { page: page.toString() };
    if (currentQuery) {
      newParams.query = currentQuery;
    }
    console.log("handlePageChange: ", newParams);
    setSearchParams(newParams);
  };

  const handleSearch = (query) => {
    console.log("handleSearch: ", query);
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

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        className="p-4"
        placeHolder="Search Movies..."
        value={currentQuery}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
  );
}

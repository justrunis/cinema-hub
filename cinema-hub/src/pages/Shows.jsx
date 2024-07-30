import { useQuery } from "@tanstack/react-query";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import Pager from "../components/UI/Pager";
import { useSearchParams } from "react-router-dom";
import { STALE_TIME } from "../utils/constants";
import SearchBar from "../components/UI/SearchBar";
import { fetchTrendingShows } from "../api/http";
import ShowCard from "../components/Shows/ShowCard";
import { useEffect } from "react";

export default function Shows() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentQuery = searchParams.get("query") || "";

  document.title = "TV Shows";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shows", currentPage, currentQuery],
    queryFn: ({ signal }) =>
      fetchTrendingShows({
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

  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        className="p-4"
        placeHolder="Search Shows..."
        value={currentQuery}
      />
      {data?.results.length === 0 ? (
        <div className="flex items-center mt-4 justify-center text-center text-primary font-bold">
          <p>No shows found for the query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {data?.results.map((show) => (
              <ShowCard key={show.id} show={show} />
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

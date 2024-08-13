import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchShowEpisodeDetails } from "../api/http";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import {
  STALE_TIME,
  IMAGE_URL,
  PLACEHOLDER_PROFILE_IMAGE,
} from "../utils/constants";
import ShowDetail from "../components/Shows/ShowDetail";
import StarRating from "../components/Movies/StarRating";
import Card from "../components/UI/Card";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Dropdown from "../components/UI/Dropdown";

export default function ShowEpisode() {
  const { id, season, episode } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["showEpisode", id, season, episode],
    queryFn: ({ signal }) =>
      fetchShowEpisodeDetails({ id, season, episode, signal }),
    staleTime: STALE_TIME,
  });

  const [isCrewOpen, setIsCrewOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleCrewDropdown = () => {
    setIsCrewOpen(!isCrewOpen);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator
        title="Failed to fetch show episode"
        message={error.message}
      />
    );
  }

  if (!isError && !isLoading) {
    return (
      <motion.div
        className="flex flex-col justify-center gap-5 items-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col justify-center bg-base-300 rounded-lg shadow-md p-6 w-half">
          <div className="flex justify-start px-4 py-6 gap-4">
            <Link
              to={`/shows/${id}/season/${season}`}
              className="text-accent hover:underline text-start"
            >
              Go back to season
            </Link>
            <Link
              to={`/shows/${id}`}
              className="text-accent hover:underline text-start"
            >
              Go back to show
            </Link>
            <Link
              to={`/shows`}
              className="text-accent hover:underline text-start"
            >
              Go back to all shows
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-center">
                Episode {data.episode_number} : {data.name}
              </h1>
              <img
                src={`${IMAGE_URL}${data.still_path}`}
                alt={data.name}
                className="rounded-lg w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-2">
              <ShowDetail title="Air Date">{data.air_date}</ShowDetail>
              <ShowDetail title="Runtime">{data.runtime} min.</ShowDetail>
              <ShowDetail title="Overview">{data.overview}</ShowDetail>

              <ShowDetail title="Vote Average">
                <StarRating
                  className="flex flex-row gap-2"
                  rating={data.vote_average}
                />
              </ShowDetail>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center place-items-start gap-4">
            {data.crew.length > 0 && (
              <div className="relative">
                <Dropdown title="Crew" className="flex flex-col items-center">
                  <ul className="grid grid-cols-2 lg:grid-cols-4 items-center gap-4 bg-base-100 rounded-lg p-6">
                    {data.crew.map((crew) => (
                      <li key={crew.credit_id}>
                        <Card className="flex flex-col items-center gap-1 bg-base-200 p-4 rounded-lg">
                          <p className="font-bold">{crew.job}</p>
                          <img
                            src={
                              crew.profile_path
                                ? `${IMAGE_URL}${crew.profile_path}`
                                : PLACEHOLDER_PROFILE_IMAGE
                            }
                            alt={crew.name}
                            className="rounded-lg shadow-md w-auto h-auto"
                          />
                          <p>{crew.name}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>
            )}
            {data.guest_stars.length > 0 && (
              <div className="relative">
                <Dropdown
                  title="Guest Stars"
                  className="flex flex-col items-center"
                >
                  <ul className="grid grid-cols-2 lg:grid-cols-4 items-center gap-4 bg-base-100 rounded-lg p-6">
                    {data.guest_stars.map((star) => (
                      <li key={star.credit_id}>
                        <Card className="flex flex-col items-center gap-1 bg-base-200 p-4 rounded-lg">
                          <p className="font-bold text-center">
                            {star.character}
                          </p>
                          <img
                            src={
                              star.profile_path
                                ? `${IMAGE_URL}${star.profile_path}`
                                : PLACEHOLDER_PROFILE_IMAGE
                            }
                            alt={star.name}
                            className="rounded-lg shadow-md w-auto h-auto"
                          />
                          <p className="text-center">{star.name}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}

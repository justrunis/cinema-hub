import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchShowDetails,
  isItemFavorite,
  isItemInWatchlist,
} from "../api/http";
import { STALE_TIME, IMAGE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import StarRating from "../components/Movies/StarRating";
import { round } from "../utils/formatting";
import ShowDetail from "../components/Shows/ShowDetail";
import ShowDetailsGrid from "../components/Shows/ShowDeailsGrid";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { favoritesActions } from "../store/slices/favorites";
import { watchlistActions } from "../store/slices/wathclist";
import { FaListAlt } from "react-icons/fa";
import Button from "../components/UI/Button";
import ShowReviews from "../components/Shows/ShowReviews";
import VideoPlayer from "../components/UI/VideoPlayer";
import { Link } from "react-router-dom";

export default function Show() {
  const { id } = useParams();

  const token = localStorage.getItem("cinema-hub-token");
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["show", id],
    queryFn: ({ signal }) => fetchShowDetails({ id, signal }),
    staleTime: STALE_TIME,
  });

  const { data: isFavoriteData, isLoading: isFavoriteLoading } = useQuery({
    queryKey: ["isFavorite", id],
    queryFn: ({ signal }) => isItemFavorite({ itemId: id, token, signal }),
    staleTime: STALE_TIME,
  });

  const isFavorite = isFavoriteData?.isFavorite;

  const { data: isInWatchlist, isLoading: isWatchlistLoading } = useQuery({
    queryKey: ["isWatchlist", id],
    queryFn: ({ signal }) => isItemInWatchlist({ itemId: id, token, signal }),
    staleTime: STALE_TIME,
  });

  const isWatchlist = isInWatchlist?.isInWatchlist;

  function addFavorite() {
    const payload = {
      itemId: data.id,
      itemType: "tv",
      title: data.name || data.original_name,
      original_name: data.original_name || data.name || "Unknown",
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      token: localStorage.getItem("cinema-hub-token"),
    };
    dispatch(favoritesActions.addFavorite(payload));
    window.location.reload();
  }

  function removeFavorite() {
    const payload = {
      token: localStorage.getItem("cinema-hub-token"),
      id: data?.id,
    };
    dispatch(favoritesActions.removeFavorite(payload));
    window.location.reload();
  }

  function addWatchlist() {
    const payload = {
      itemId: data.id,
      itemType: "tv",
      title: data.name || data.original_name,
      original_name: data.original_name || data.name || "Unknown",
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      token: localStorage.getItem("cinema-hub-token"),
    };
    dispatch(watchlistActions.addWatchlist(payload));
    window.location.reload();
  }

  function removeWatchlist() {
    const payload = {
      token: localStorage.getItem("cinema-hub-token"),
      id: data?.id,
    };
    dispatch(watchlistActions.removeWatchlist(payload));
    window.location.reload();
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <div className="flex justify-center p-6">
        <ErrorIndicator
          title="Failed to fetch show details"
          message={error?.message || "An unknown error occurred"}
        />
      </div>
    );
  }

  if (data) {
    document.title = `${data.name || data.original_name}`;
  }

  const buttonClass = "flex items-center btn rounded-lg";
  const iconClass = "text-xl cursor-pointer";
  const textClass = "font-bold text-sm";

  const favButtonProps = isFavorite
    ? {
        className: `${buttonClass} bg-accent text-primary-content hover:bg-red-600`,
        icon: <FaHeart className={`text-primary ${iconClass}`} />,
        text: "Remove from favorites",
        onClick: removeFavorite,
      }
    : {
        className: `${buttonClass} bg-primary text-primary-content hover:bg-accent`,
        icon: <FaRegHeart className={`text-primary-content ${iconClass}`} />,
        text: "Add to favorites",
        onClick: addFavorite,
      };

  const watchlistButtonProps = isWatchlist
    ? {
        className: `${buttonClass} bg-accent text-primary-content hover:bg-red-600`,
        text: "Remove from watchlist",
        icon: <FaListAlt className={`text-primary ${iconClass}`} />,
        onClick: removeWatchlist,
      }
    : {
        className: `${buttonClass} bg-primary text-primary-content hover:bg-accent`,
        text: "Add to watchlist",
        icon: <FaListAlt className={`text-primary-content ${iconClass}`} />,
        onClick: addWatchlist,
      };

  return (
    <motion.div
      className="flex flex-col justify-center gap-5 items-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col justify-center bg-base-300 rounded-lg shadow-md p-6 w-full">
        <div className="flex justify-start px-4 py-6 gap-4">
          <Link
            to={`/shows`}
            className="text-accent hover:underline text-start"
          >
            Go back to all shows
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-around">
          <div className="flex flex-col gap-4 p-8">
            <h1 className="text-3xl font-bold text-center">
              {data.name || data.original_name}
            </h1>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={
                data.poster_path
                  ? `${IMAGE_URL}${data.poster_path}`
                  : PLACEHOLDER_IMAGE
              }
              alt={data.name}
              className="rounded-lg w-auto h-auto"
            />
          </div>
          <div className="flex flex-col gap-4">
            <ShowDetail title="Details" delay={0.2}>
              <ul className="flex gap-2">
                {data.genres.map((genre) => (
                  <li className="" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </ShowDetail>
            <ShowDetail title="Rating" delay={0.4}>
              <StarRating
                className="flex items-center gap-2"
                rating={round(data.vote_average)}
              />
            </ShowDetail>
            <ShowDetail title="Overview" delay={0.6}>
              <p className="max-w-sm">{data.overview}</p>
            </ShowDetail>
            <ShowDetail title="Homepage" delay={0.8}>
              <a
                href={data.homepage}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {data.homepage}
              </a>
            </ShowDetail>
          </div>
          <div className="flex flex-col gap-4">
            <ShowDetailsGrid data={data} />
          </div>
        </div>
        <div className="self-center flex flex-col items-center justify-center gap-4 px-8 pb-6 max-w-7xl w-full">
          <VideoPlayer id={data.id} type="tv" delay={2.4} />
          {token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col lg:flex-row items-center gap-2 mt-2"
              transition={{ delay: 2.6 }}
            >
              <Button
                onClick={favButtonProps.onClick}
                className={favButtonProps.className}
                disabled={isFavoriteLoading}
              >
                {favButtonProps.icon}
                <p className={`text-primary-content ${textClass}`}>
                  {favButtonProps.text}
                </p>
              </Button>

              <Button
                className={watchlistButtonProps.className}
                onClick={watchlistButtonProps.onClick}
                disabled={isWatchlistLoading}
              >
                {watchlistButtonProps.icon}
                <p className={`text-primary-content ${textClass}`}>
                  {watchlistButtonProps.text}
                </p>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-base-300 px-8 rounded-lg shadow-md py-6 w-full">
        <ShowReviews id={data?.id} />
      </div>
    </motion.div>
  );
}

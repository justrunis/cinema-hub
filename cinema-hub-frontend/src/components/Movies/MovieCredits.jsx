import { motion } from "framer-motion";
import { fetchMovieCredits } from "../../api/http";
import {
  STALE_TIME,
  PLACEHOLDER_PROFILE_IMAGE,
  IMAGE_URL,
} from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorIndicator from "../UI/ErrorIndicator";
import Dropdown from "../UI/Dropdown";
import Card from "../UI/Card";

export default function MovieCredits({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: ({ signal }) => fetchMovieCredits({ id, signal }),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorIndicator
        title="Failed to load movie credits"
        message={error.message}
      />
    );
  }

  if (!isError && !isLoading) {
    console.log(data);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <Dropdown title="Cast" className="flex flex-col gap-2 items-center">
          <ul className="grid grid-cols-2 lg:grid-cols-4 items-center gap-4">
            {data.cast.map((person) => (
              <li key={person.credit_id}>
                <Card className="flex flex-col items-center gap-2 bg-base-100 rounded-lg p-4">
                  <p className="font-bold">{person.character}</p>
                  <img
                    src={
                      person.profile_path
                        ? `${IMAGE_URL}${person.profile_path}`
                        : PLACEHOLDER_PROFILE_IMAGE
                    }
                    alt={person.name}
                    className="rounded-lg shadow-md w-1/2 h-auto"
                  />
                  <p>{person.name}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Dropdown>
      </motion.div>
    );
  }
}

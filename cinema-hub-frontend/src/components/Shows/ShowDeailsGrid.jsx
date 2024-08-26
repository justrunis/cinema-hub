import { motion } from "framer-motion";
import ShowDetail from "./ShowDetail";
import { Link } from "react-router-dom";

export default function ShowDetailsGrid({ data }) {
  const details = [
    { title: "First Air Date", value: data.first_air_date },
    { title: "Last Air Date", value: data.last_air_date },

    { title: "Status", value: data.status },
    {
      title: "Next episode to Air",
      value: data.next_episode_to_air
        ? data.next_episode_to_air.air_date
        : "No upcoming episodes",
    },
    { title: "Seasons", value: data.number_of_seasons },
    { title: "Episodes", value: data.number_of_episodes },
  ];

  function createSeasonsArray(number_of_seasons) {
    return [...Array(number_of_seasons).keys()].map((season) => season + 1);
  }

  const seasons = createSeasonsArray(data.number_of_seasons);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-4">
        {details.map((detail, index) => (
          <motion.div
            key={detail.title}
            className="flex flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.2 }}
          >
            <ShowDetail title={detail.title} delay={1 + index * 0.2}>
              {detail.value}
            </ShowDetail>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <ShowDetail title="Seasons" delay={1.8}>
          <ul className="flex gap-2">
            {seasons.map((season) => (
              <li key={season}>
                <Link
                  to={`/shows/${data.id}/season/${season}`}
                  className="text-accent hover:underline"
                >
                  {season}
                </Link>
              </li>
            ))}
          </ul>
        </ShowDetail>
      </motion.div>
    </>
  );
}

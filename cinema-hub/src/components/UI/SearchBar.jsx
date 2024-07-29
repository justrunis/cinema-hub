import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  onSearch,
  placeHolder = "Search...",
  className,
  value,
}) {
  const [searchTerm, setSearchTerm] = useState(value || "");

  useEffect(() => {
    console.log("SearchBar:", searchTerm);
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center ${className}`}
    >
      <input
        type="text"
        placeholder={placeHolder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg"
      />
    </motion.div>
  );
}

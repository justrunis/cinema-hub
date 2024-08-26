import Button from "../UI/Button";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const maxButtons = 7; // Number of buttons to display, including first and last

function PageButton({ children, className, ...props }) {
  return (
    <Button
      className={`btn flex justify-center items-center text-accent-content px-2 py-1 sm:px-3 sm:py-2 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default function Pager({ totalPages, currentPage, setCurrentPage }) {
  const getItemProps = (index) => ({
    className: `btn px-2 py-1 sm:px-3 sm:py-2 min-h-0 ${
      currentPage === index
        ? "text-base-content bg-accent text-accent-content"
        : "bg-primary text-primary-content hover:bg-accent hover:text-accent-content"
    }`,
    onClick: () => setCurrentPage(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getPagerButtons = () => {
    const maxVisibleButtons = maxButtons - 2; // Subtract 2 for first and last buttons
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middle = Math.floor(maxVisibleButtons / 2);

      if (currentPage <= middle) {
        startPage = 1;
        endPage = maxVisibleButtons;
      } else if (currentPage + middle >= totalPages) {
        startPage = totalPages - maxVisibleButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middle;
        endPage = currentPage + middle;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="btn btn-primary text-primary-content px-2 py-1 sm:px-3 sm:py-2 min-h-0 h-8 sm:h-10 hover:bg-accent hover:text-accent-content"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <FaArrowAltCircleLeft className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2">
        {getPagerButtons().map((page) => (
          <PageButton key={page} {...getItemProps(page)}>
            {page}
          </PageButton>
        ))}
      </div>
      <button
        className="btn btn-primary text-primary-content px-2 py-1 sm:px-3 sm:py-2 min-h-0 h-8 sm:h-10 hover:bg-accent"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <FaArrowAltCircleRight strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}

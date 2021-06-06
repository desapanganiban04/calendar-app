const Pagination = ({ page, onChange }) => {
  const handleOnNext = () => {
    onChange(page + 1);
  };

  const handleOnPrevious = () => {
    onChange(page - 1);
  };

  return (
    <div className="p-3 m-3 bg-gray-800 rounded-md flex flex-col xs:flex-row items-center xs:justify-between flex-shrink-0">
      <span className="text-xs xs:text-sm text-white font-bold">
        Page {page}
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
          onClick={handleOnPrevious}
          disabled={page === 1 ? true : false}
        >
          Prev
        </button>
        <button
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
          onClick={handleOnNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

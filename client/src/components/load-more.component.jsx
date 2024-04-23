const LoadMoreDataBtn = ({ state, fetchDataFun, additionalParam }) => {
  if (state !== null && state.totalDocs > state.results.length) {
    return (
      <button
        onClick={() => fetchDataFun({...additionalParam, page: state.page + 1 })}
        className={
          "text-grey bg-black w-full  center text-xl p-2 px-3 rounded-full justify-center  flex items-center gap-2 mb-2"
        }
      >
        Load More
      </button>
    );
  }
};

export default LoadMoreDataBtn;

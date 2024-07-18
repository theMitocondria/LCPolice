import React from 'react';

const CheatersShimmerUi = () => {
  return (
    <>
      {new Array(15).fill(0).map((val, ind) => {
        const isEven = ind % 2 === 0;
        return (
          <div
            key={ind}
            className={`flex items-center py-2 mt-2 rounded-sm h-12 text-gray-100 font-medium text-lg w-full ${isEven ? 'bg-n-10' : 'bg-n-11'}`}
          >
            <div className="hidden w-1/3 md:w-1/5 md:flex justify-center shimmer">Loading</div>
            <div className="w-1/3 md:w-1/5 flex justify-center break-all text-center shimmer">Loading</div>
            <div className="hidden w-1/3 md:w-1/5 md:flex justify-center shimmer">Loading</div>
            <div className="w-1/3 md:w-1/5 flex justify-center shimmer">
              <button className="px-5 py-[0.5px] rounded-md bg-gray-400 flex justify-center shimmer-text">Code</button>
            </div>
            <div className="w-1/3 md:w-1/5 md:flex justify-center shimmer">
              <button className="flex justify-center bg-red-600 rounded-md w-fit px-4 shimmer-text">Report</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CheatersShimmerUi;

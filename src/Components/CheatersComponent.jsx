import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../CONSTANTS/urls";

const CheatersComponent = ({
  rank,
  username,
  plagPercentage,
  index,
  codeId,
}) => {
  const isEven = index % 2 === 0;
  const [cheaterSol, setCheaterSol] = useState(null);
  const [modal, setModal] = useState(false);
  const [teleSol, setTeleSol] = useState(null);
  let location = useLocation();
  location = location.pathname;
  location = location.slice(1, location.length - 10);

  async function handleGetCode() {
    setModal(true);
    try {
      setTeleSol(localStorage.getItem("teleSol"));
      const responseCode = await fetch(BASE_URL + `solution/${codeId}`);
      const code = await responseCode.json();
      setCheaterSol(code.solution["code"]);
    } catch (error) {
      console.error("Error fetching solution:", error);
    }
  }

  const closeModal = () => {
    setModal(false);
    setCheaterSol(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleClick = (event) => {
    event.preventDefault(); 
    const url = `https://leetcode.com/contest/${location}/ranking/${Math.ceil(rank / 25)}`;
    const windowFeatures = 'width=800,height=800,top=100,left=800';
    window.open(url, 'Leetcode', windowFeatures);
  };

  return (
    <div
      className={`flex items-center py-2 mt-2 rounded-sm h-12 text-gray-100 font-medium text-lg w-full ${
        isEven ? "bg-n-10" : "bg-n-11"
      }`}
    >
      <div className="hidden w-1/3 md:w-1/5 md:flex justify-center">{rank}</div>
      <div className=" w-1/3 md:w-1/5 flex justify-center break-all text-center">
        {username}
      </div>
      <div className="hidden w-1/3  md:w-1/5 md:flex justify-center">
        {(plagPercentage * 100).toFixed(2)} %
      </div>
      <div className=" w-1/3  md:w-1/5  flex justify-center">
        <button
          onClick={handleGetCode}
          className=" px-5 py-[0.5px] rounded-md bg-gray-100 text-black font-bold  flex justify-center"
        >
          Code
        </button>
      </div>
      <div className="w-1/3  md:w-1/5 md:flex justify-center">
      <a
      href={`https://leetcode.com/contest/${location}/ranking/${Math.ceil(rank / 25)}`}
      className="flex justify-center bg-red-700 rounded-md w-fit px-4 font-bold"
      onClick={handleClick}
      target="_top"
      rel="nofollow noopener noreferrer"
    >
      Report
    </a>
      </div>

      {modal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-start justify-center bg-gray-800 "
          onClick={handleOverlayClick}
        >
          <div className=" bg-transparent p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Solution</h2>
              <h2
                className="text-lg font-semibold text-white cursor-pointer"
                onClick={closeModal}
              >
                Close
              </h2>
            </div>
            <div className="flex lg:space-x-4 mt-2 w-[90vw] flex-col lg:flex-row gap-2">
              <pre className="overflow-auto h-96 lg:h-[80vh] w-full lg:w-1/2  text-black bg-gray-100 rounded-md">
                <p className="font-bold p-2 bg-black  text-white">
                  Telegram Solution
                </p>
                <div className="p-2 text-sm">
                  {teleSol || "Loading telegram solution ..."}
                </div>
              </pre>
              <pre className="overflow-auto h-96 lg:h-[80vh] w-full lg:w-1/2 text-black bg-gray-100 rounded-md">
                <p className="font-bold bg-black p-2 w-full text-white">
                  User Solution
                </p>
                <div className="p-2 text-sm">
                  {cheaterSol || "loading user solution...."}
                </div>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheatersComponent;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TelegramSolution } from '../Context/TelegramSolContext.jsx';

const ContestComponent = ({ name, question3Cheater, question4Cheater , cheated3sol, cheated4sol}) => {
  const { setTeleSol } = useContext(TelegramSolution);
  const navigate = useNavigate(); // Use the navigate hook

  const url = "/data/" + name.replaceAll(' ', '-');

  const handleLinkClick = (solfromtele, path) => {
    //console.log(solfromtele)
    setTeleSol(solfromtele);
    localStorage.setItem('telsol', solfromtele)
    navigate(path); // Navigate after updating state
  };

  return (
    <div className="flex items-center justify-between bg-[#979bf0ac] p-2 px-12 m-2 rounded-sm text-gray-100 font-medium text-lg w-full">
      <div className="w-[60%]">{name}</div>
      <div className="w-[30%] flex justify-evenly">
        <div
          className="pr-8 underline text-black cursor-pointer"
          onClick={() => handleLinkClick(cheated3sol, `${url}/3`)}
        >
          {question3Cheater}
        </div>
        <div
          className="pl-2 underline text-black cursor-pointer"
          onClick={() => handleLinkClick(cheated4sol, `${url}/4`)}
        >
          {question4Cheater}
        </div>
      </div>
    </div>
  );
};

export default ContestComponent;

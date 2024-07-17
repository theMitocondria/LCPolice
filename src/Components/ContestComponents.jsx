import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TelegramSolution } from '../Context/TelegramSolContext.jsx';

const ContestComponent = ({ name, question3Cheater, question4Cheater,  telegram3Sol ,  telegram4Sol, question3Id, question4Id}) => {

  const navigate = useNavigate();
  const {setQuestionId} = useContext(TelegramSolution)

  name = name.replaceAll(' ', '-');


  const handleCheatersClick = async(questionId, question) => {
    setQuestionId(questionId)
    localStorage.setItem('questionId', questionId);
   if(question == 3) localStorage.setItem('teleSol', telegram3Sol);
   else localStorage.setItem('teleSol', telegram4Sol);
    navigate(`/${name}/cheaters/`)
  }

  return (
    <div className="flex items-center justify-between bg-n-10 p-2 px-12 m-2 rounded-sm text-gray-100 font-medium text-lg w-full rounded-xl">
      <div className="w-[60%]">{name}</div>
      <div className="w-[30%] flex justify-evenly">
        <div
          className="pr-8 underline text-black cursor-pointer"
          onClick={() => handleCheatersClick(question3Id,3)}
        >
          {question3Cheater}
        </div>
        <div
          className="pl-2 underline text-black cursor-pointer"
          onClick={() => handleCheatersClick(question4Id, 4)}
        >
          {question4Cheater}
        </div>
      </div>
    </div>
  );
};

export default ContestComponent;

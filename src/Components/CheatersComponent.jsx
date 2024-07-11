import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../CONSTANTS/urls';
import { TelegramSolution } from '../Context/TelegramSolContext';

const CheatersComponent = ({ rank, username, plagPercentage, contestName, index, questionNumber }) => {

  const isEven = index % 2 === 0;
  let { teleSol, setTeleSol} = useContext(TelegramSolution);
  const [cheaterSol, setCheaterSol] = useState(null);
  const [modal, setModal] = useState(false);
  // console.log(teleSol)
  if(!teleSol) {setTeleSol(localStorage.getItem('telsol')); }

  // Adjusting contestName as per your requirement
  let actualContestName = "leetcode " + contestName;
  actualContestName = actualContestName.replaceAll(' ', '-');
  contestName = contestName.replace(' ', '-contest-');

  async function handleGetCode() {
    setModal(true);
    try {
      const response = await fetch(BASE_URL + 'solution/' + actualContestName + '/rank/' + rank + '/' + questionNumber);
      const sol = await response.json();
      setCheaterSol(sol.solution.solution);
      console.log(sol);
      console.log(teleSol);
    } catch (error) {
      console.error('Error fetching solution:', error);
    }
  }

  const closeModal = () => {
    setModal(false);
    setCheaterSol(null); // Reset solution when modal is closed
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) { // only close modal if clicked on overlay itself, not its children
      closeModal();
    }
  };

  return (
    <div className={`flex items-center py-2 mt-2 rounded-sm h-12 text-gray-100 font-medium text-lg w-full ${isEven ? 'bg-[#979bf0b5]' : 'bg-[#7f7fd2b3]'}`}>
      <div className="hidden w-1/3 md:w-1/5 md:flex justify-center">{rank}</div>
      <div className=" w-1/3 md:w-1/5 flex justify-center">{username}</div>
      <div className="hidden w-1/3  md:w-1/5 md:flex justify-center">{(plagPercentage * 100).toFixed(2)} %</div>
     <div className=' w-1/3  md:w-1/5  flex justify-center'>
     <button onClick={handleGetCode} className=" px-5 py-[0.5px] rounded-md bg-gray-400  flex justify-center">Code</button>
     </div>
      <div className='w-1/3  md:w-1/5 md:flex justify-center'>
        <Link
          target='_blank'
          to={`https://leetcode.com/contest/${contestName}/ranking/${Math.ceil(rank / 25)}`}
          className="flex justify-center bg-red-600 rounded-md w-fit px-4"
        >
          Report
        </Link>
      </div>

      {modal && (
        <div className="fixed top-0 left-0  w-full h-full flex items-center justify-center  bg-gray-800 bg-opacity-75" onClick={handleOverlayClick}>
         
          <div className=" bg-transparent p-4 rounded-lg">
            <div className="flex justify-between items-center">
              
              <h2 className="text-lg font-semibold text-white">Solution</h2>
              <h2 className="text-lg font-semibold text-white cursor-pointer" onClick={closeModal}>Close</h2>
              
      
            </div>
            <div className="flex  space-x-4 mt-2 w-[80vw]">
              <pre className="overflow-auto max-h-[80vh] w-1/2  text-black bg-gray-100 rounded-md">
                <p className='font-bold p-2 bg-black  text-white'>Telegram Solution</p>
               <div className='p-2'>
               {teleSol || 'No solution from Telegram context'}
               </div>
              </pre>
              <pre className="overflow-auto max-h-[80vh] w-1/2 text-black bg-gray-100 rounded-md">
              <p className='font-bold bg-black p-2  text-white'>User Solution</p>
               <div className='p-2'>
               {cheaterSol || 'No solution from cheater'}
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

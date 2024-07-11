
import { useEffect, useState } from "react";

import { BASE_URL } from "./CONSTANTS/urls";
import ContestComponent from "./Components/ContestComponents.jsx";
import Developers from "./Components/Developers.jsx";

function App() {
  const [contests, setContest] = useState([]);
  useEffect(() => {
    async function fetchContest() {
      const response = await fetch(BASE_URL + 'contest/all');
      const data = await response.json();
      setContest(data.getAll);
      console.log(data);
    }
    fetchContest();
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen border-[1px] border-blue-100 bg-[#0b0a0d] overflow-x-hidden">
      <div className="px-4 md:px-12 lg:px-24 py-8">
        <div className="px-2">
          <p className="font-extrabold text-[32px] md:text-[40px] text-white">LC Police 🚨</p>
        </div>
        <div className="p-3 bg-[#979bf0ac] h-auto md:h-24 my-6 rounded-md border-l-4 border-blue-100">
          <p className="mb-2 text-gray-200 font-medium text-lg md:text-xl">
            Level up FAIRLY! Tired of contests rigged by cheaters? We are too.
          </p>
          <p className="text-gray-200 text-sm md:text-md">
            This app exposes the top 2,000 plagiarizers (more coming soon!), identifying code matches over 90% from leaks. Now you can compete on a fair playing field and showcase your true skills!
          </p>
        </div>
        <div className="px-2 md:px-4">
          <div className="text-white flex  justify-between font-semibold text-lg md:text-xl">
            <div className="md:pl-4 w-2/3">Contests</div>
            <div className="w-1/3 flex justify-evenly  md:mt-0">
              <div>Q3</div>
              <div>Q4</div>
            </div>
          </div>
          <div>
            {contests?.map((contest, ind) => {
              return (
                <ContestComponent
                  key={ind}
                  cheated3sol={contest.cheated3Sol}
                  cheated4sol={contest.cheated4Sol}
                  name={contest.name}
                  question3Cheater={contest.question3.length}
                  question4Cheater={contest.question4.length}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Developers />
    </div>
  );
}

export default App;

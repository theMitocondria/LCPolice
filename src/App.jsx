// src/App.jsx or src/App.tsx

import { useEffect, useState } from "react"

import { BASE_URL } from "./CONSTANTS/urls";
import ContestComponent from "./Components/ContestComponents.jsx";

function App() {

  const [contests, setContest] = useState([]);
  useEffect(() => {
    async function fetchContest(){
      const response = await fetch(BASE_URL+'contest/all')
      const data =await response.json();
      setContest(data.getAll)
    }
    fetchContest()
  },[])

  return (
    <div className=" px-48  py-8 min-h-[100vh] border-[1px] border-blue-100 bg-[#0b0a0d]">
      <div className=" px-2">
        <p className=" font-extrabold text-[40px]  text-white">LC Police 🚨</p>
      </div>
      <div className=" bg-[#979bf0ac] h-36 my-6 rounded-md border-l-4 border-blue-100 ">

      </div>
      <div className=" px-4">
        <div className="text-white flex justify-between font-semibold text-xl">
          <div className=" pl-24 w-2/3">Contests</div>
          <div className=" w-1/3 flex justify-evenly">
            <div>Q3</div>
            <div>Q4</div>
          </div>
        </div>
        <div>
          { contests?.map((contest, ind) => {
            return <ContestComponent  key = {ind} cheated3sol = {contest.cheated3sol} cheated4sol={contest.cheated4sol} name={contest.name} question3Cheater={contest.question3.length} question4Cheater={contest.question4.length} />
          })}
        </div>
      </div>
    </div>
  )
}

export default App

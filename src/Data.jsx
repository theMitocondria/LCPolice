
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import debounce from "./hooks/useDebounce";
import { BASE_URL } from "./CONSTANTS/urls";
import CheatersComponent from "./Components/CheatersComponent";

function Data() {
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState(null);
  const [searchedUser, setSearchedUser] = useState([]);
  const [allData , setallData] = useState([]);
  const [cheaters, setCheaters] = useState(null);
  let location = useLocation();
  location = location.pathname.slice(6);

  const contestName = location.replaceAll('-', ' ')
//   console.log(location);

  useEffect(() => {
    async function fetchCheaters() {
      let response = await fetch(BASE_URL + "/contests/" + location);
      let cheaters = await response.json();
      setCheaters(cheaters.cheaters_sol);
      setallData(cheaters.cheaters_sol);
    }
    fetchCheaters();

  }, []);

  async function searchUser(e) {
    if (!e.target.value) {
      setCheaters(allData);
      setError(null), setSearchedUser([]);
      return;
    } 
    const searchedCheaters = allData.filter((curr)=>{
        if(curr.username.includes(e.target.value))return curr;
    })
    // console.log(searchedCheaters);
    setCheaters(searchedCheaters);
  }
  const handleSearchUser = debounce(searchUser, 500);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

 

  return (
    <div className=" px-48  py-8 min-h-[100vh] border-[1px] border-blue-100 bg-[#0b0a0d]">
      <div className=" px-2 flex  justify-between">
       <div>
       <p className=" font-extrabold text-[40px]  text-white">{capitalizeFirstLetter(contestName.slice(0, contestName.length-2))}</p>
        <p className=" font-extrabold text-[40px]  text-white">Question {contestName.slice(contestName.length-1)}</p>
        
       </div>
        <input
          onInput={handleSearchUser}
          type="text"
          placeholder="Search user"
          className=" py-0 h-10 mx-6 mt-1 rounded-full px-3 w-4/12 bg-slate-300"
        />
      </div>
      <div className=" bg-[#979bf0ac] h-36 my-6 rounded-md border-l-4 border-blue-100 "></div>
      <div className=" px-4">
        <div className="text-white flex font-semibold text-xl">
          <div className=" w-1/5 flex justify-center">Rank</div>
          <div className=" w-1/5 flex justify-center">Username</div>
          <div className=" w-1/5 flex justify-center">Plagiarism (%)</div>
          <button  className=" w-1/5 flex justify-center">Code</button>
          <div className=" w-1/5 flex justify-center">Report</div>
        </div>
        <div>
        {cheaters?.map((cheater, index) => (
            <CheatersComponent
              key={index}
              rank={cheater.rank}
              username={cheater.username.trim()} // Ensure to call the function if username is a function
              plagPercentage={cheater.cheatedPercentage}
              contestName={contestName.slice(9, contestName.length-2)}
              index = {index}
              questionNumber = {contestName.slice(contestName.length-1)}
            />
          ))}
        </div>

       <p className="text-white font-medium mt-2 text-right"> Kudos to you for not being in the list 🎉 🥳  </p>    
      </div>
    </div>
  );
}

export default Data;

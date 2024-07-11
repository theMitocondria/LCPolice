
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debounce from "./hooks/useDebounce";
import { BASE_URL } from "./CONSTANTS/urls";
import CheatersComponent from "./Components/CheatersComponent";

function Data() {
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState(null);
    const [searchedUser, setSearchedUser] = useState([]);
    const [allData, setallData] = useState([]);
    const [cheaters, setCheaters] = useState(null);
    let location = useLocation();
    location = location.pathname.slice(6);

    const contestName = location.replaceAll('-', ' ')

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
        const searchedCheaters = allData.filter((curr) => {
            if (curr.username.includes(e.target.value)) return curr;
        })
        setCheaters(searchedCheaters);
    }
    const handleSearchUser = debounce(searchUser, 500);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8 min-h-[100vh] border-[1px] border-blue-100 bg-[#0b0a0d]">
            <div className="px-2 flex flex-col md:flex-row justify-between">
                <div>
                    <p className="font-extrabold text-[24px] md:text-[32px] lg:text-[40px] text-white">{capitalizeFirstLetter(contestName.slice(0, contestName.length - 2))}</p>
                    <p className="font-extrabold text-[24px] md:text-[32px] lg:text-[40px] text-white">Question {contestName.slice(contestName.length - 1)}</p>
                </div>
                <input
                    onInput={handleSearchUser}
                    type="text"
                    placeholder="Search user"
                    className=" py-0 h-10 mx-6 mt-1 rounded-full px-3 w-4/12 bg-slate-300"
                />
            </div>
            <div className="text-[16px] md:text-[18px] text-gray-100 p-3 bg-[#979bf0ac] h-auto my-6 rounded-md border-l-4 border-blue-100">
                <p className="mb-2"><span className="font-medium text-lg md:text-xl">Exposed Code:</span> See the suspicious code's similarity score and click <span className="px-3 py-1 rounded-md bg-gray-400 font-bold">Code</span> to view a comparison. This reveals the potentially leaked code and the user's submission side-by-side. If you suspect cheating, click <span className="px-3 rounded-md bg-red-500 font-bold py-1">Report</span> to flag the user directly on the contest platform. Help us keep the playing field level by reporting confirmed cheaters.</p>
                <p className="mb-2"><span className="font-medium text-lg md:text-xl">Search suspicious:</span> Can't find someone you suspect? Don't worry, our hardware is constantly being upgraded to catch more cheaters.</p>
                <p><span className="font-medium text-lg md:text-xl">Request:</span> This app is still under beta testing, so there might be a few cases where code matches aren't perfect. Try searching for different users to see its effectiveness. We're constantly improving, so thanks for your patience!</p>
            </div>
            <div className="px-2 md:px-4 overflow-x-auto">
                <div className="text-white flex font-semibold text-lg md:text-xl">
                    <div className="hidden w-1/3 md:w-1/5 md:flex justify-center">Rank</div>
                    <div className=" md:w-1/5 w-1/3 md:flex justify-center">Username</div>
                    <div className=" hidden w-1/3 md:w-1/5 md:flex justify-center">Plagiarism (%)</div>
                    <div className=" w-1/3 md:w-1/5 md:flex justify-center">Code</div>
                    <div className=" w-1/3md:w-1/5 md:flex justify-center">Report</div>
                </div>
                <div>
                    {cheaters?.map((cheater, index) => (
                        <CheatersComponent
                            key={index}
                            rank={cheater.rank}
                            username={cheater.username.trim()}
                            plagPercentage={cheater.cheatedPercentage}
                            contestName={contestName.slice(9, contestName.length - 2)}
                            index={index}
                            questionNumber={contestName.slice(contestName.length - 1)}
                        />
                    ))}
                </div>
                <p className="text-white font-medium mt-2 text-right"> Kudos to you for not being in the list 🎉 🥳  </p>
            </div>
        </div>
    );
}

export default Data;

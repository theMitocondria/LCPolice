import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debounce from "./hooks/useDebounce";
import { BASE_URL } from "./CONSTANTS/urls";
import CheatersComponent from "./Components/CheatersComponent";
import Section from "./design/Section";
import { curve } from "./assets";

function Data() {
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState(null);
    const [searchedUser, setSearchedUser] = useState([]);
    const [allData, setallData] = useState([]);
    const [cheaters, setCheaters] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    let location = useLocation();
    location = location.pathname.slice(6);

    const contestName = location.replaceAll('-', ' ');

    useEffect(() => {
        async function fetchCheaters() {
            try {
                setLoading(true); // Set loading to true before fetching data
                let response = await fetch(BASE_URL + "/contests/" + location);
                let cheaters = await response.json();
                setCheaters(cheaters.cheaters_sol);
                setallData(cheaters.cheaters_sol);
            } catch (error) {
                console.error("Failed to fetch cheaters:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }
        fetchCheaters();
    }, [location]);

    async function searchUser(e) {
        if (!e.target.value) {
            setCheaters(allData);
            setError(null);
            setSearchedUser([]);
            return;
        }
        const searchedCheaters = allData.filter((curr) => {
            if (curr.username.includes(e.target.value)) return curr;
        });
        setCheaters(searchedCheaters);
    }

    const handleSearchUser = debounce(searchUser, 500);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Section
            className="pt-[12rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="hero"
        >
            <div className="container relative">
                <div className="min-h-[100vh]">
                    <div className="px-2 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                            <h1 className="h4 text-center">
                                {capitalizeFirstLetter(contestName.slice(0, contestName.length - 2))}<br></br>
                                <span className="inline-block relative">
                                    Question {contestName.slice(contestName.length - 1)}
                                    <img
                                        src={curve}
                                        className="absolute top-full left-0 w-full xl:-mt-2"
                                        width={624}
                                        height={28}
                                        alt="Curve"
                                    />
                                </span>
                            </h1>
                        </div>
                        <input
                            className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] border-n-1/10 border text-base w-full md:w-1/3`}
                            type="text"
                            placeholder="Search user"
                            onInput={handleSearchUser}
                        >
                        </input>
                    </div>
                    <div className="text-[16px] md:text-[18px] text-gray-100 p-3 h-auto my-6 rounded-lg">
                        <p className="mb-2">
                            <span className="font-medium text-lg md:text-xl underline">Exposed Code:</span> Check out the suspicious code's similarity score. Click <span className="px-3 py-1 rounded-md bg-gray-400 font-bold">Code</span> to compare the potentially leaked code with the user's submission side-by-side. If you suspect cheating, click <span className="px-3 rounded-md bg-red-500 font-bold py-1">Report</span> to flag the user directly on the contest platform. Help us maintain a fair competition by reporting confirmed cheaters.
                        </p>
                        <p className="mb-2">
                            <span className="font-medium text-lg md:text-xl underline">Search Suspicious:</span> Can't find someone you suspect? Don't worry, our hardware is constantly being upgraded to catch more cheaters.
                        </p>
                        <p>
                            <span className="font-medium text-lg md:text-xl underline">Request:</span> This app is still in beta testing, so there might be occasional inaccuracies in code matching. <span className="text-red-500 font-bold">If you are a legitimate user who has been mistakenly flagged, please email us at leetcodePolice@gmail.com</span>. We will promptly remove you from the list.
                        </p>
                    </div>
                    <div className="px-2 md:px-4 overflow-x-auto">
                        <div className="text-white flex font-semibold text-lg md:text-xl">
                            <div className="hidden w-1/3 md:w-1/5 md:flex justify-center">Rank</div>
                            <div className="md:w-1/5 w-1/3 md:flex justify-center">Username</div>
                            <div className="hidden w-1/3 md:w-1/5 md:flex justify-center">Plagiarism (%)</div>
                            <div className="w-1/3 md:w-1/5 md:flex justify-center">Code</div>
                            <div className="w-1/3 md:w-1/5 md:flex justify-center">Report</div>
                        </div>
                        <div>
                            {loading ? (
                                <div className="text-white text-center mt-8">Loading...</div>
                            ) : (
                                cheaters?.map((cheater, index) => (
                                    <CheatersComponent
                                        key={index}
                                        rank={cheater.rank}
                                        username={cheater.username.trim()}
                                        plagPercentage={cheater.cheatedPercentage}
                                        contestName={contestName.slice(9, contestName.length - 2)}
                                        index={index}
                                        questionNumber={contestName.slice(contestName.length - 1)}
                                    />
                                ))
                            )}
                        </div>
                        <h1 className="text-white font-medium mt-2 text-center text-xl p-12"> Kudos to you for not being in the list 🎉 🥳 </h1>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Data;

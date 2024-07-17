import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debounce from "./hooks/useDebounce";
import { BASE_URL } from "./CONSTANTS/urls";
import CheatersComponent from "./Components/CheatersComponent";
import Section from "./design/Section";
import { curve } from "./assets";
import { TelegramSolution } from "./Context/TelegramSolContext";

function Data() {
    const [cheaters, setCheaters] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [cheatersSize, setCheatersSize] = useState();
    let location = useLocation();
    location = location.pathname
    location = location.slice(1, location.length-10)


    const {questionId, setQuestionId} = useContext(TelegramSolution);
    let qId = questionId
    if(!qId){
        qId= localStorage.getItem('questionId')
        setQuestionId(qId)
      
    }

    
    const [page_no, setPage] = useState(1);
    const [number, setNumber] = useState([]);

    useEffect(() => {
        async function fetchContestSize(){
            const response = await fetch(BASE_URL + `getAllCheater/${qId}`);
            const data = await response.json();
            setCheatersSize(data.size)
            console.log(data.size)
          }
          fetchContestSize();
    }, [])


    useEffect(() => {
        async function fetchCheaters() {
            try {
               
                setLoading(true); 
                const data =await fetch(BASE_URL + `contest/${qId}?page_no=${page_no}&limit=25`);
                const res = await data.json();
                setCheaters(res.cheaters)
                setNumber(Array.from({ length: parseInt((cheatersSize+24)/25)}, (_, index) => index + 1));

            } catch (error) {
                console.error("Failed to fetch cheaters:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }
        fetchCheaters();
    }, [page_no]);

    async function searchUser(e) {
 
      try{
        setLoading(true);
        const responseData = await fetch(BASE_URL + `contest/${questionId}?username=${e.target.value}&page_no=1&limit=25`)
        const response = await responseData.json()
        setCheaters(response.cheaters)
      }catch(e){
        window.alert(e);
      }finally{
        setLoading(false)
      }
        
    }

    const handleSearchUser = debounce(searchUser, 500);

function capitalizeWords(sentence) {
    const words = sentence.split(" ");
    const capitalizedWords = words.map(word => {
      if (word === "") return word; 

      return word.charAt(0).toUpperCase() + word.slice(1);
    });  
    return capitalizedWords.join(" ");
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
                               {capitalizeWords(location.replaceAll('-', ' '))}
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


                    

                                <div> 
                                {
                                    
                                cheaters?.map((cheater, index) => (
                                    <CheatersComponent
                                        key={index}
                                        rank={cheater.rank}
                                        username={cheater.name_of_cheater}
                                        plagPercentage={cheater.plagpercentage}
                                        index={index}
                                        codeId = {cheater.code}
                                    />
                                ))
                                }
                                {
                                    number?.length > 0 && <div className=" flex justify-center items-center">
                                        <p
                                            className={" cursor-pointer text-2xl " + (page_no == 1 && " hidden")}
                                            onClick={() => { setPage(page_no - 1) }}
                                        > &#x2B05;</p>
                                        {
                    
                                            number.map((num, index) => {
                                                return (
                                                    <span onClick={() => { setPage(num) }} className={" px-2 border-2 border-gray-600 m-2 cursor-pointer bg-slate-500 rounded-lg text-lg " + (page_no == num && " bg-slate-800 scale-125 text-white")} key={index}>{num}</span>
                                                )
                                            })
                    
                                        }
                                        <p
                                            className={" cursor-pointer text-2xl " + (page_no == parseInt((cheatersSize+24)/25) && " hidden")}
                                            onClick={() => { setPage(page_no + 1) }}
                                        >&#x27A1;</p>
                                    </div>
                    
                                }
                    
                            </div>
                 
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

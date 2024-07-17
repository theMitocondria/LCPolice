import { useEffect, useState } from "react";

import { BASE_URL } from "./CONSTANTS/urls";
import ContestComponent from "./Components/ContestComponents.jsx";
import Developers from "./Components/Developers.jsx";
import Hero from "./Components/Hero.jsx";
import Section from "./design/Section.jsx";

function App() {
  const [contests, setContest] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [page_no, setPageNo] = useState(1);
  const [contestSize, setContestSize] = useState(0);

  const [number, setNumber] = useState([]);

  useEffect(() => {
    async function fetchContestSize() {
      const response = await fetch(BASE_URL + `getAllContest`);
      const data = await response.json();
      setContestSize(data.size);
    }
    fetchContestSize();
  }, []);

  useEffect(() => {
    async function fetchContest() {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(
        BASE_URL + `contest/all?page_no=${page_no}&limit=10`
      );
      const data = await response.json();
      setContest(data.getAll);
      console.log(data.getAll);
      setNumber(
        Array.from({ length: (contestSize + 9) / 10 }, (_, index) => index + 1)
      );
      setLoading(false); // Set loading to false after fetching data
    }
    fetchContest();
  }, [page_no]);

  return (
    <>
      <Hero />
      <Section className="pt-[12rem] -mt-[5.25rem]">
        <div className="container relative">
          <div className="px-2 md:px-4 mb-10">
            <div className="text-white flex justify-between font-semibold text-lg md:text-xl">
              <div className="md:pl-4 w-2/3">Contests</div>
              <div className="w-1/3 flex justify-evenly md:mt-0">
                <div>Q3</div>
                <div>Q4</div>
              </div>
            </div>
            <div>
              {loading ? ( // Conditionally render the loading indicator or the contest data
                <div className="text-white text-center mt-8">Loading...</div>
              ) : (
                <div>
                  {contests.map((contest, ind) => (
                    <ContestComponent
                      key={ind}
                      telegram3Sol={contest.cheated3Sol["code"]}
                      telegram4Sol={contest.cheated4Sol["code"]}
                      question3Id={contest.question3["id"]}
                      question4Id={contest.question4["id"]}
                      name={contest.name}
                      question3Cheater={contest.question3["num_of_cheaters"]}
                      question4Cheater={contest.question4["num_of_cheaters"]}
                    />
                  ))}
                  {number?.length > 0 && (
                    <div className=" flex justify-center items-center">
                      <p
                        className={
                          " cursor-pointer text-2xl " +
                          (page_no == 1 && " hidden")
                        }
                        onClick={() => {
                          setPageNo(page_no - 1);
                        }}
                      >
                        {" "}
                        &#x2B05;
                      </p>
                      {number.map((num, index) => {
                        return (
                          <span
                            onClick={() => {
                              setPageNo(num);
                            }}
                            className={
                              " px-2 border-2 border-gray-600 m-2 cursor-pointer bg-slate-500 rounded-lg text-lg " +
                              (page_no == num &&
                                " bg-slate-800 scale-110 text-white")
                            }
                            key={index}
                          >
                            {num}
                          </span>
                        );
                      })}
                      <p
                        className={
                          " cursor-pointer text-2xl " +
                          (page_no == parseInt((cheatersSize + 9) / 10) &&
                            " hidden")
                        }
                        onClick={() => {
                          setPageNo(page_no + 1);
                        }}
                      >
                        &#x27A1;
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Developers />
        </div>
      </Section>
    </>
  );
}

export default App;

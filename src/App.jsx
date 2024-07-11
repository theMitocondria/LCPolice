import { useEffect, useState } from "react";

import { BASE_URL } from "./CONSTANTS/urls";
import ContestComponent from "./Components/ContestComponents.jsx";
import Developers from "./Components/Developers.jsx";
import Hero from "./Components/Hero.jsx";
import Section from "./design/Section.jsx";
import { socials } from "./CONSTANTS/index.js";

function App() {
  const [contests, setContest] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchContest() {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch(BASE_URL + 'contest/all');
      const data = await response.json();
      setContest(data.getAll);
      setLoading(false); // Set loading to false after fetching data
    }
    fetchContest();
  }, []);

  return (
    <>
      <Hero />
      <Section
        className="pt-[12rem] -mt-[5.25rem]">
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
                contests?.map((contest, ind) => (
                  <ContestComponent
                    key={ind}
                    cheated3sol={contest.cheated3Sol}
                    cheated4sol={contest.cheated4Sol}
                    name={contest.name}
                    question3Cheater={contest.question3.length}
                    question4Cheater={contest.question4.length}
                  />
                ))
              )}
            </div>
          </div>
          <Developers />
        </div>
      </Section>
      <Section crosses className="!px-0 !py-10">
        <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
          <p className="caption text-n-4 lg:block">
            UI -Abhay Bajaj  © {new Date().getFullYear()}. All rights reserved.
          </p>

          <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <img src={item.iconUrl} width={16} height={16} alt={item.title} />
              </a>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

export default App;

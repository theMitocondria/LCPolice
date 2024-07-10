// src/App.jsx or src/App.tsx

import { Link } from "react-router-dom"
function App() {
  return (
    <div className=" px-48  py-8 h-[100vh] border border-[1px] border-blue-100 bg-[#0b0a0d]">
      <div className=" px-2">
        <p className=" font-extrabold text-[40px]  text-white">LC Police</p>
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
            <div className=" flex items-center justify-between bg-[#979bf0ac] p-2 px-12 m-2 rounded-sm  text-gray-100 font-medium text-lg w-full ">
              <div className=" w-[60%]  ">Biweekly Contest 134</div>
              <div className=" w-[30%] flex justify-evenly ">
                  <Link to="./jhh" className=" pr-8">&#8594;</Link>
                  <Link to="./jhh" className=" pl-2">&#8594;</Link>
              </div>
            </div>
            <div className=" flex items-center justify-between bg-[#979bf05a] p-2 px-12 m-2 rounded-sm  text-gray-100 font-medium text-lg w-full ">
              <div className=" w-[60%]  ">Biweekly Contest 134</div>
              <div className=" w-[30%] flex justify-evenly ">
                  <Link to="./jhh" className=" pr-8"></Link>
                  <Link to="./jhh" className=" pl-2"></Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App

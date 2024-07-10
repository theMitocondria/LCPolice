// src/App.jsx or src/App.tsx

import { Link } from "react-router-dom"
function Data() {
    return (
        <div className=" px-48  py-8 h-[100vh] border border-[1px] border-blue-100 bg-[#0b0a0d]">
            <div className=" px-2 flex  justify-between">
                <p className=" font-extrabold text-[40px]  text-white">LC Police</p>
                <input type="text" placeholder="Search user" className=" py-0 h-10 mx-6 mt-1 rounded-full px-3 w-4/12 bg-slate-300" />
            </div>
            <div className=" bg-[#979bf0ac] h-36 my-6 rounded-md border-l-4 border-blue-100 ">

            </div>
            <div className=" px-4">
                <div className="text-white flex font-semibold text-xl">
                    <div className=" w-1/5 flex justify-center">Rank</div>
                    <div className=" w-1/5 flex justify-center">Username</div>
                    <div className=" w-1/5 flex justify-center">Plagiarism (%)</div>
                    <div className=" w-1/5 flex justify-center">Code</div>
                    <div className=" w-1/5 flex justify-center">Report</div>
                </div>
                <div>

                    <div className="  flex items-center bg-[#979bf0b5] py-2 mt-2 rounded-sm h-12  text-gray-100 font-medium text-lg w-full ">
                        <div className=" w-1/5 flex justify-center">1234</div>
                        <div className=" w-1/5 flex justify-center">mitocondia</div>
                        <div className=" w-1/5 flex justify-center">12</div>
                        <div className=" w-1/5 flex justify-center">Code</div>
                        <div className=" w-1/5 flex justify-center">Report</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data;

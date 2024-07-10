import React from 'react'
import { Link } from 'react-router-dom'

const ContestComponent = ({ name, question3Cheater, question4Cheater}) => {

  const url = "/data/" + name.replaceAll(' ', '-');
  return (
    <div className="flex items-center justify-between bg-[#979bf0ac] p-2 px-12 m-2 rounded-sm text-gray-100 font-medium text-lg w-full">
      <div className="w-[60%]">{name}</div>
      <div className="w-[30%] flex justify-evenly">
        <Link to={`${url}/3`} className="pr-8 underline text-black">{question3Cheater} </Link>
        <Link to={`${url}/4`} className="pl-2 underline text-black">{question4Cheater} </Link>
      </div>
    </div>
  )
} 

export default ContestComponent;

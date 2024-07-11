import React from 'react'
import { Link } from 'react-router-dom';

const developers = [
    {
      name: 'Sourav',
      url: 'https://www.linkedin.com/in/srv333/',
      icon: 'https://res.cloudinary.com/dycitvrpg/image/upload/v1681474382/linkedin_sl7ith.png'
    },
    {
      name: 'Gautam Khatri',
      url: 'https://www.linkedin.com/in/gautambuddh/',
      icon: 'https://res.cloudinary.com/dycitvrpg/image/upload/v1681474382/linkedin_sl7ith.png'
    },
    {
      name: 'Dhruv Metha',
      url: 'https://www.linkedin.com/in/itzzdhruv/',
      icon: 'https://res.cloudinary.com/dycitvrpg/image/upload/v1681474382/linkedin_sl7ith.png'
    }
  ];

const Developers = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-500">
      <h6 className="text-3xl text-gray-100 font-medium mb-2 mr-5">Help Us Improve!</h6>
      <div className="flex w-full justify-evenly">
        {developers.map((dev, index) => (
          <div key={index} className="flex flex-col items-center">
            <a className='flex justify-center flex-col items-center' href={dev.url} target="_blank">
              <button className=" bg-transparent  rounded-full my-2">
                <img src={dev.icon} alt={dev.name} className="w-8 h-8" />
              </button>
              <p className="text-lg px-3 py-1 font-bold text-white">{dev.name}</p>
            </a>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Developers

// const Header = ()=>{
//     return (
//         <div className=" h-8  bg-gray-500 flex items-center justify-evenly">
//             <p className=" text-white font-bold">Save the Sport</p>
//             <p className=" text-white font-bold">Everyone should have fair chance</p>
//             <p className=" text-white font-bold">Contribute by reporting </p>
//         </div>
//     )
// }

// export default Header;

// //help yourself by reporting cheaters
// // save the sport
// //

const Header = () => {
    return (
      <div className="h-auto py-1 bg-gray-500 flex flex-col md:flex-row items-center justify-evenly p-2">
        <p className="text-white font-bold text-center md:text-left">Save the Sport</p>
        <p className="text-white font-bold text-center md:text-left">Everyone should have fair chance</p>
        <p className="text-white font-bold text-center md:text-left">Contribute by reporting</p>
      </div>
    );
  }
  
  export default Header;
  
import { navigation } from "./CONSTANTS";

const Header = () => {
  return (
    <div
      className={` w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-n-8 
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-10">
        <nav
          className={`top-[5rem] left-0 right-0 bottom-0 flex mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex items-center justify-center m-auto flex-col lg:flex-row">
            {navigation.map((item) => (
              <div
                key={item.id}
                href={item.url}
                className={`block relative font-code text-xl uppercase text-n-1/50 transition-colors hover:text-color-1 px-6 py-2 lg:py-6 lg:-mr-0.25 lg:text-sm lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 text-center`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
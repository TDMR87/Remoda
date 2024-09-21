import { useDarkMode } from "../Contexts/DarkModeContext";

export const MovieCardSkeleton = () => {

  const { colorSchemes } = useDarkMode();

  return (
    <>
      <div className={`${colorSchemes.backgroundSkeleton} rounded-xl shadow-lg relative ml-4 mr-4 mb-8 mt-0 animate-pulse`}>
        <div className="p-4 w-full max-w-sm">
          <div className="flex flex-col mb-5 items-center">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full max-w-xs mb-4"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mt-2"></div>
          </div>
          <div className="flex flex-col mb-5 items-center">
            <div className="w-full h-60 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
          <div className="mb-5">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
          </div>
          <div className="w-full h-[36px] bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        </div>
      </div>
    </>
  );
}

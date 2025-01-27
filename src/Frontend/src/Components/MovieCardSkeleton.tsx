import { useAppContext } from "../Contexts/AppContext";

export const MovieCardSkeleton = () => {

  const { colorSchemes } = useAppContext();

  return (
    <div className={`${colorSchemes.backgroundSkeleton} rounded-xl shadow-lg p-4 ml-8 mb-6 animate-pulse max-w-full sm:w-96`}>
      <div className="p-4">
        <div className="flex flex-col mb-5 items-center">
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mt-2"></div>
        </div>
        <div className="flex flex-col mb-5 items-center">
          <div className="w-48 h-60 bg-gray-300 rounded dark:bg-gray-500"></div>
        </div>
        <div className="mb-5">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
        </div>
        <div className="w-full h-9 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

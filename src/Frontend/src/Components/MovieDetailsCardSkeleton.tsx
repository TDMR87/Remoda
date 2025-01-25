import { useDarkMode } from "../Contexts/DarkModeContext";

export const MovieDetailsCardSkeleton = () => {
  const { colorSchemes } = useDarkMode();

  return (
    <div className={`${colorSchemes.background} rounded-xl shadow-sm relative p-4`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-5 items-center md:items-start gap-6 animate-pulse">
          {/* Image skeleton */}
          <div className="bg-gray-300 lg:w-96 sm:w-48 w-48 lg:h-96 h-64 rounded-lg"></div>

          {/* Content skeleton */}
          <div className="flex-grow w-full">

            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>

            {/* Star rating skeleton */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-4 bg-yellow-300 rounded-full w-20"></div>
              <div className="h-4 bg-gray-200 rounded-full w-10"></div>
            </div>

            {/* Tagline skeleton */}
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-8"></div>

            {/* Overview skeleton */}
            <div className="space-y-2 mb-5">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4"></div>
            </div>

            <hr className={`${colorSchemes.background} mb-5`} />

            {/* Genres, Release Date, and Runtime skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { memo, useEffect, useState } from 'react';

interface SearchBarProps {
  onActivate: (searchTerm: string) => void;
  onClear: () => void;
  isSticky: () => boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onActivate, onClear, isSticky }) => {

  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Recall the user's previous search term
  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, []);

  // Hide / un-hide the search bar based on scrolling
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (!isSticky() && scrollY > lastScrollTop) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      lastScrollTop = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  // When search term changes, debounce after a delay
  useEffect(() => {
    let timerId: number;
    if (searchTerm) {
      timerId = setTimeout(async () => {
        onActivate(searchTerm);
        localStorage.setItem('searchTerm', searchTerm);
      }, 500);
    }
    else {
      localStorage.removeItem('searchTerm');
      onClear();
    }
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const searchBarStyle: React.CSSProperties = {
    position: 'fixed',
    top: !isSticky() && isScrolledDown ? '-150px' : '9rem', // Hide the search bar when scrolling down
    transition: 'top 0.3s ease-in-out',
    zIndex: 2
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 mb-100 rounded-full shadow-sm" style={searchBarStyle}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); }}
          className="py-6 shadow-xl w-full pl-10 pr-10 rounded-full focus:outline-none ring-2 ring-sky-700 bg-stone-100" />
      </div>
    </div>
  );
};

export default memo(SearchBar);
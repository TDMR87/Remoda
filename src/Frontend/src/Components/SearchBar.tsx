import React, { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  onActivate: (searchTerm: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onActivate, onClear }) => {

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');

    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollTop) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }

      lastScrollTop = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    top: isScrolledDown ? '-150px' : '140px',
    transition: 'top 0.3s ease-in-out',
    zIndex: 2
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 mb-100 rounded-full shadow-lg" style={searchBarStyle}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); }}
          className="py-6 shadow-xl w-full pl-10 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-indigo-100" />
      </div>
    </div>
  );
};
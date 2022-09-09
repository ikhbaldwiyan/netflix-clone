import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { AiFillBell } from 'react-icons/ai';
import Link from "next/link";
import SearchResult from './SearchResult';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('');
  const [pages, setPages] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, []);

  const handleSearch = (result: string) => {
    if (result.length > 1) {
      setSearch(true)
      setValue(result)
    } else {
      setSearch(false)
    }
    console.log(result)
  }

  useEffect(() => {
    async function getSearchMovies() {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&query=${value}&page=1&include_adult=false`)
      .then((response) => response.json())

      if(data.results && value) {
        setMovies(data.results)
        setPages(data.total_pages)
      } else {
        setSearch(false)
      }
    }

    getSearchMovies();
  }, [search, value])


  const menu = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "TV",
      href: "/popular",
    },
    {
      name: "Movies",
      href: "/",
    },
    {
      name: "New & Popular",
      href: "/popular",
    },
    {
      name: "My List",
      href: "/",
    },
  ]

  return (
    <>
      <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-4 md:space-x-10">
          <Link href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
            />
          </Link>
          <ul className="hidden space-x-4 md:flex">
            {menu.map((item, idx) => (
              <Link key={idx} href={item.href}>
                <li className="menu"> {item.name} </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <form className="hidden lg:flex items-center">   
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pr-3 pointer-events-none">
                  <IoMdSearch className="hidden h-6 w-6 sm:inline text-white" />
                </div>
                <input onChange={(e) => handleSearch(e.target.value)} type="text" className="bg-[#141414] bg-opacity-50 border border-gray-300 text-white text-sm rounded-lg block w-full pl-10 py-2 px-4" placeholder="Search Movies" />
              </div>
          </form>
          <AiFillBell className="h-6 w-6" />
          <Link href="/account">
            <img
              src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>
        </div>
      </header>

      {search && movies.length ? (
        <SearchResult result={value} movies={movies} pages={pages} />
      ) : movies.length === 0 && value.length  ? (
        <SearchResult result={value} movies={movies} pages={pages} />
      ) : (
        ''
      )}
    </>
  )
}

export default Header
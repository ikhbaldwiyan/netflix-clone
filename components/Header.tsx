import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { AiFillBell } from 'react-icons/ai';
import Link from "next/link";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-4 md:space-x-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />     

        <ul className="hidden space-x-4 md:flex">
          {menu.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <li className="menu"> {item.name} </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <IoMdSearch className="hidden h-6 w-6 sm:inline" />
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
  )
}

export default Header
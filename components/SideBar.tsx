
"use client"
import { Bars3CenterLeftIcon, BookmarkSquareIcon, BookOpenIcon, Cog6ToothIcon, HomeIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideBar = ({session}:{session:Session|null}) => {
  const pathName = usePathname();
  const links = [
    {
      name: 'Home',
      href: '/home',
      icon: <HomeIcon className='w-6 h-6' />,
      needLogedIn: false,
    },
    {
      name: 'Discover',
      href: '/discover',
      icon:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-compass w-6 h-6" viewBox="0 0 16 16">
      <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
      <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
    </svg>,
      needLogedIn: false,
    },
    {
      name: 'My Books Rentals',
      href: '/my-books-rentals',
      icon: <BookmarkSquareIcon className='w-6 h-6' />,
      needLogedIn: true,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon : <Cog6ToothIcon className='w-6 h-6' />,
      needLogedIn: true,
    },
    {
      name: 'Help',
      href: '/help',
      icon: <QuestionMarkCircleIcon className='w-6 h-6' />,
      needLogedIn: false,
    },
  ]

  const adminLinks = [
    {
      name: 'Books',
      href: '/admin/books',
      icon: <BookOpenIcon className='w-6 h-6' />,
    },
    {
      name: 'Rents',
      href: '/admin/rents',
      icon: <Bars3CenterLeftIcon className='w-6 h-6' />,
    },
  ]
  return (
    <nav className='flex overflow-x-auto scrollbar-custom min-h-20 flex-row w-full sm:w-64 sm:flex-col gap-4 items-center px-5 sm:h-full bg-white sm:pt-5'>
      {
        links.map((link, index) => (
          link.needLogedIn === true ? 
          ( 
            session?.user.id_user ? ( <Button
              as={Link}
              key={`
              ${index}-${link.name}-${link.href}
              `} href={link.href} className={`w-full justify-center sm:justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === link.href ? 'bg-gest_cta text-white' : ''} `}>
                {link.icon}
                <span className='font-semibold ml-1 hidden sm:block'>{link.name}</span>
              </Button>) : (
                <></>
              )
            
           )
          :
          (  <Button
            as={Link}
            key={`
            ${index}-${link.name}-${link.href}
            `} href={link.href} className={`w-full justify-center sm:justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === link.href ? 'bg-gest_cta text-white' : ''} `}>
              {link.icon}
              <span className='font-semibold ml-1 hidden sm:block'>{link.name}</span>
            </Button>)
        
        ))
      }
       {
        session?.user?.is_admin && adminLinks.map((link, index) => (
          <Button
          as={Link}
          key={`
          ${index}-${link.name}-${link.href}
          `} href={link.href} className={`w-full justify-center sm:justify-start rounded-lg bg-transparent hover:bg-gest_cta data-[hover=true]:text-white data-[hover=true]:opacity-100 ${pathName === link.href ? 'bg-gest_cta text-white' : ''} `}>
            {link.icon}
            <span className='font-semibold ml-1 hidden sm:block'>{link.name}</span>
          </Button>
        ))
      }
    </nav>
  );
};

export default SideBar;
'use client'

import { topBarLinks } from '@/constants'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {useState } from 'react'
import "../app/globals.css"
import { BiCart } from 'react-icons/bi'
import PrefabCart from './solutions/flexi-habitat/PrefabCart'


function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

const TopNavBar = ({user}: {user: any}) => {

  const pathname = usePathname();
  const [day, setDay] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const onThemeClick = () => {
    setDay(!day);
  }

  const searchParam = useSearchParams()
  const who = searchParam.get("who")
  const [navbarColor, setNavbarColor] = useState<string>("white")

    const changeNavbarBGColor = () => {
      if (pathname == "/") {
        if(typeof window != "undefined" && window.scrollY < 200){
          typeof document != undefined && document.querySelector(".topnavlinks")?.classList.add("links")
          typeof document != undefined && document.querySelector(".topnav")?.classList.add("topnavbar")
          setNavbarColor("main-100")
        }else{
          typeof document != undefined &&document.querySelector(".topnav")?.classList.remove("topnavbar")
          typeof document != undefined &&document.querySelector(".topnavlinks")?.classList.remove("links")
          setNavbarColor("white")
        }
      }else{
        typeof document != undefined &&document.querySelector(".topnav")?.classList.remove("topnavbar")
        typeof document != undefined &&document.querySelector(".topnavlinks")?.classList.remove("links")
        setNavbarColor("main-100")
      }
    }

    const changeNavbarStyle = () => {
      typeof document != undefined &&document.querySelector(".topnav")?.classList.remove("topnavbar")
      typeof document != undefined &&document.querySelector(".topnavlinks")?.classList.remove("links")

      setNavbarColor("main-100")
    }

    typeof document != undefined &&document.addEventListener("scroll", changeNavbarBGColor)
    typeof document != undefined &&document.addEventListener("mouseover", changeNavbarStyle)

  return (
    <>
      {
        pathname === "/in" || pathname.startsWith(`/in/`) || pathname === "/sign-in" || pathname === "/sign-up"
          ?
          ""
          :
      <Disclosure as="nav" className="fixed bg-transparent z-40 w-full px-5">
        <div className={`mx-auto px-4 rounded-full bg-white border-2 border-${navbarColor} mt-3 topnav`}>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href={"/"} className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="/logo/spacematch.png"
                  className="h-16 w-auto hover:shadow-md hover:shadow-main-100 rounded-full"
                /> 
                {/* SpaceMatch */}
              </Link>
                  {/* Navbar Links */}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 topnavlinks">
              <div className="hidden sm:ml-6 sm:block mr-3">
                <div className="flex justify-center items-center space-x-4 ">
                  {topBarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    const addedActive = item.route === `/${who}` || item.route.startsWith(`${who}/`)
                    return (
                      <Link
                          key={item.label}
                          href={item.route}
                          className={classNames(
                          isActive || addedActive ? 'border-b-2 border-main-100 text-main-100' : 'text-gray-800 hover:border-main-100 focus:border-main-100 border-b-2 ',
                          'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                      >
                          {item.label}
                      </Link>
                    )
                  })}

                  <button 
                    onClick={() => setModalOpen(true)}
                    className='flex justify-center items-center gap-2'
                  >
                    <span className='absolute top-2 size-4 right-[110px] rounded-full bg-red-500 text-white border animate-pulse'></span>
                    <BiCart className='size-8'/>
                  </button>

                  <button
                    onClick={onThemeClick}
                    className="px-3 py-3">
                    {
                      day 
                      ?
                      <Image src="/icons/night.png" width={20} height={20} alt='Night'/>
                      :
                      <Image src="/icons/sun.png" width={20} height={20} alt='Day'/>
          
                    }
                  </button>
                  
                </div>
              </div>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {
                      user 
                      ?
                      <Image 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${user.photo}`}
                        width={60}
                        height={50}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      /> 
                      :
                      <Image
                        src={`/icons/user-info.jpg`}
                        width={60}
                        height={50}
                        alt={"user"}
                        className="size-8 rounded-full border"
                      />
                    }
                  </MenuButton>
                </div>
                {
                  user
                  &&
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href="/in"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                }
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 bg-white flex flex-col items-center">
            {topBarLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
              return (
                  <DisclosureButton
                    key={item.label}
                    as="a"
                    href={item.route}
                    aria-current={isActive ? 'page' : undefined}
                    className={classNames(
                      isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-800 border-b-2 border-white hover:border-main-100 text-center font-semibold',
                      'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  >
                      {item.label}
                  </DisclosureButton>
              )
              })}
               
          </div>
        </DisclosurePanel>
      </Disclosure>
      }
      <PrefabCart modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </>
  )
}

export default TopNavBar;
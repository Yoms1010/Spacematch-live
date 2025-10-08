'use client'

import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useStateContext } from '@/context/ContextProvider'
import { logout } from '@/lib/actions/user.action'



const NavBar = ({user}: {user: any}) => {

      const router = useRouter()
      const {token, setToken} = useStateContext()
    
      const onSignOut = async () => {
        await logout()
          typeof window && window.localStorage.removeItem('ACCESS_TOKEN');
          setToken("")
          // typeof window && window.location.reload()
          return router.replace("/sign-in?logged out")
      }
    

  return (
    <Disclosure as="nav" className="bg-white shadow-md shadow-gray-500 max-sm:hidden">
      <div className="mx-auto px-5 max-sm:px-3 max-lg:px-3">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {/* SpaceMatch */}
            </div>
                {/* Navbar Links */}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div
              className="relative rounded-full bg-main-100 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-logoRed focus:ring-offset-2 focus:ring-offset-logoRed"
            >
              {/* {
                user?.whoId?.split(";")[0] == "Buyer" && buyerChatCount > 0
                  ?
                <span className="absolute right-2 -top-2 -inset-1.5 bg-red-500 rounded-full flex justify-center items-center h-5 w-5 font-semibold">
                  <p>{buyerChatCount && buyerChatCount}</p>  
                </span>
                : user?.whoId?.split(";")[0] == "Agent" && agentChatCount > 0
                &&
                <span className="absolute right-2 -top-2 -inset-1.5 bg-red-500 rounded-full flex justify-center items-center h-5 w-5 font-semibold">
                  <p>{agentChatCount && agentChatCount}</p>  
                </span>
                
              } */}
              <span className="sr-only">View notifications</span>
              
              <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-main-100 text-sm focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 focus:ring-offset-main-100">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {/* {
                  user && user.whoId.split(";")[0] == "Buyer"
                  ?
                  (
                    buyerChatNotice && buyerChatNotice.map((item: any, i: React.Key) => (
                      item.is_read == "No"
                      ?
                      <MenuItem>
                        <Link
                          key={i}
                          href={"/in/chat"}
                          className="flex flex-col justify-start items-start py-2 px-2 space-x-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full"
                        >
                          <div className='flex flex-col justify-start items-start text-sm text-gray-700 w-full'>
                            <div className='flex justify-between items-center w-full text-xs'>
                              <p>{item.name}</p>
                              <p>{item.created_at.split("T")[0]}</p>
                            </div>
                            <div className='flex flex-row justify-start items-center space-x-1 text-sm text-gray-700 w-full'>
                              <div className='w-40'><ChatBubbleBottomCenterIcon className='text-xl'/></div> 
                              <div className='italic text-xs truncate w-30 font-semibold'>{item.message}</div>
                            </div>
                          </div>
                          <div className='border-b w-full'></div>
                        </Link>
                      </MenuItem>
                      :
                      <MenuItem>
                        <Link
                          key={i}
                          href={"/in/chat"}
                          className="flex flex-col justify-start items-start py-2 px-2 space-x-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full"
                        >
                          <div className='flex flex-col justify-start items-start text-sm text-gray-700 w-full'>
                            <div className='flex justify-between items-center w-full text-xs'>
                              <p>{item.name}</p>
                              <p>{item.created_at.split("T")[0]}</p>
                            </div>
                            <div className='flex flex-row justify-start items-center space-x-1 text-sm text-gray-700 w-full'>
                              <ChatBubbleBottomCenterIcon className='size-6'/> 
                              <p className='italic text-xs truncate w-30'>{item.message}</p>
                            </div>
                          </div>
                          <div className='border-b w-full'></div>
                        </Link>
                      </MenuItem>
                  ))
                  )
                  :
                  (
                    agentChatNotice && agentChatNotice.map((item: any, i: React.Key) => (
                      item.is_read == "No"
                      ?
                      <MenuItem>
                        <Link
                          key={i}
                          href={"/in/chat"}
                          className="flex flex-col justify-start items-start py-2 px-2 space-x-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full"
                        >
                          <div className='flex flex-col justify-start items-start text-sm text-gray-700 w-full'>
                            <div className='flex justify-between items-center w-full text-xs'>
                              <p>{item.name}</p>
                              <p>{item.created_at.split("T")[0]}</p>
                            </div>
                            <div className='flex flex-row justify-start items-center space-x-1 text-sm text-gray-700 w-full'>
                              <ChatBubbleBottomCenterIcon className='size-6'/> 
                              <div className='italic text-xs truncate w-30 font-semibold'>{item.message}</div>
                            </div>
                          </div>
                          <div className='border-b w-full'></div>
                        </Link>
                      </MenuItem>
                      :
                      <MenuItem>
                        <Link
                          key={i}
                          href={"/in/chat"}
                          className="flex flex-col justify-start items-start py-2 px-2 space-x-1 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full"
                        >
                          <div className='flex flex-col justify-start items-start text-sm text-gray-700 w-full'>
                            <div className='flex justify-between items-center w-full text-xs'>
                              <p>{item.name}</p>
                              <p>{item.created_at.split("T")[0]}</p>
                            </div>
                            <div className='flex flex-row justify-start items-center space-x-1 text-sm text-gray-700 w-full'>
                              <ChatBubbleBottomCenterIcon className='size-6'/> 
                              <p className='italic text-xs truncate w-30'>{item.message}</p>
                            </div>
                          </div>
                          <div className='border-b w-full'></div>
                        </Link>
                      </MenuItem>
                  ))
                  )
                } */}
              </MenuItems>
            </Menu>
            </div>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-main-100 text-sm focus:outline-none focus:ring-2 focus:ring-main-100 focus:ring-offset-2 focus:ring-offset-main-100">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {
                    user 
                    ?
                    <img
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${user.photo}`}
                      // src={``}
                      // width={40}
                      // height={40}
                      className="size-8 rounded-full"
                    />
                    :
                    <img
                      alt=""
                      src={`/icons/information.png`}
                      className="size-8 rounded-full"
                    />
                  }
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href={user && user.complete === "Yes" ? "/in/profile" : "/in"}
                    className="flex flex-row justify-start items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                  <CgProfile/> &nbsp; Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/in/settings"
                    className="flex flex-row justify-start items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                  <IoSettings/> &nbsp; Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={onSignOut}
                    className="flex flex-row justify-start items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full"
                  >
                  <FaSignOutAlt className='text-red-500'/> &nbsp; Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default NavBar;
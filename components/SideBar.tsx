'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SiderbarProps } from '@/types'
import { 
  agentSidebarLinks, 
  buyerSidebarLinks, 
  developerSidebarLinks, 
  superAdminSidebarLinks 
} from '../constants/index';
import { usePathname } from 'next/navigation'

const SideBar = ({ user, who, buyerChatCount, agentChatCount }: SiderbarProps) => {
  
  const pathname = usePathname();

  return (
    // <Suspense fallback={<SidebarLoading/>}>
      <section className="sidebar fixed">
        <nav className="flex flex-col gap-4">
          <Link href="/" target='_blank' className="cursor-pointer flex justify-center items-center ">
            <Image 
              src="/logo/spacematch.png"
              width={50}
              height={50}
              alt="SpaceMatch"
              className="size-[100px] max-xl:size-14 rounded-full border hover:shadow-2xl"
            />
            {/* <h1 className="sidebar-logo">iBankly</h1> */}
          </Link>

            {
              who && who.split(";")[0] === "SuperAdmin" ? (
              <>
                {superAdminSidebarLinks.map((item) => {
                  const isActive = pathname.startsWith(`${item.route}`) && item.label !== "Home"
      
                  return (
                    <Link href={item.route} key={item.label}
                      className={cn('sidebar-link', { 'border-b border-main-100': isActive })}
                    >
                      <div className="relative size-6">
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          fill
                          className={cn({
                            'brightness-[3] invert-0 bg-main-100': isActive
                          }, { "!text-orange-600": !isActive})}
                        />
                      </div>
                      <p className={cn("sidebar-label", { "!text-main-100": isActive })}>
                        {item.label}
                      </p>
                    </Link>
                  )
                })}
                </>
              ) : who && who?.split(";")[0] === "Developer" && user.complete == "Yes"? (
                <>
                {developerSidebarLinks.map((item) => {
                  const isActive = pathname.startsWith(`${item.route}`) && item.label !== "Home"
      
                  return (
                    <Link href={item.route} key={item.label}
                      className={cn('sidebar-link', { 'border-b border-main-100': isActive })}
                    >
                      <div className="relative size-6">
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          width={50}
                          height={50}
                          className={cn({
                            'brightness-[3] invert-0 bg-main-100': isActive
                          }, { "!text-orange-600": !isActive})}
                        />
                      </div>
                      <p className={cn("sidebar-label", { "!text-main-100": isActive })}>
                        {item.label}
                      </p>
                    </Link>
                  )
                })}
                </>  
              ) : who && who?.split(";")[0] === "Buyer" && user.complete == "Yes" ? (
                <>
                {buyerSidebarLinks.map((item) => {
                  const isActive = pathname.startsWith(`${item.route}`) && item.label !== "Home"
      
                  return (
                    <Link href={item.route} key={item.label}
                      className={cn('sidebar-link', { 'border-b border-main-100': isActive })}
                    >
                      <div className="relative size-6">
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          fill
                          className={cn({
                            'brightness-[3] invert-0 bg-main-100': isActive
                          }, { "!text-orange-600": !isActive})}
                        />
                      </div>
                      <p className={cn("sidebar-label", { "!text-main-100": isActive })}>
                        {item.label}
                      </p>
                      {
                        item.label == "Chat"
                        &&
                        <>
                          {
                            who && who.split(";")[0] == "Buyer" && buyerChatCount > 0
                              ?
                            <span className="bg-red-500 rounded-full flex justify-center items-center h-5 w-5 font-semibold">
                              <p>{buyerChatCount && buyerChatCount}</p>  
                            </span>
                            : 
                            ""
                          }
                        </>
                      }
                    </Link>
                  )
                })}
                </>  
              ) : who && who?.split(";")[0] === "Agent" && user.complete == "Yes" ? (
                <>
                {agentSidebarLinks.map((item) => {
                  const isActive = pathname.startsWith(`${item.route}/`) && item.label !== "Home"
      
                  return (
                    <Link href={item.route} key={item.label}
                      className={cn('sidebar-link', { 'border-b border-main-100': isActive })}
                    >
                      <div className="relative size-6">
                        <Image 
                          src={item.imgURL}
                          alt={item.label}
                          fill
                          className={cn({
                            'brightness-[3] invert-0 bg-main-100': isActive
                          }, { "!text-orange-600": !isActive})}
                        />
                      </div>
                      <p className={cn("sidebar-label", { "!text-main-100": isActive })}>
                        {item.label}
                      </p>

                      {
                        item.label == "Chat"
                        &&
                        <>
                          {
                            who && who.split(";")[0] == "Agent" && agentChatCount > 0
                              ?
                            <span className="bg-red-500 rounded-full flex justify-center items-center h-5 w-5 font-semibold">
                              <p>{agentChatCount && agentChatCount}</p>  
                            </span>
                            : 
                            ""
                          }
                        </>
                      }
                    </Link>
                  )
                })}
                </>  
              ) : ("Guest Functionalities")
            }
        </nav>

      </section>
    // </Suspense>
  )
}

export default SideBar
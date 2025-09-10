"use client"

import axiosClient from '@/axios-client';
import { Ellipsis, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type IdProps = {
  id: number | string | any;
}

const ChatRoom = ({id}: IdProps) => {

  const [chats, setChats] = useState<any>()
  const [agentId, setAgentId] = useState<any>()
  const [chatForm, setChatForm] = useState<any>()
  const [contacts, setContacts] = useState<any>()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [validateChat, setValidateChat] = useState("")
  const [startLoading, setStartLoading] = useState(false)


//Fetching Chat Contacts
useEffect(() => {
  axiosClient.get(`/buyer/contacts/${id}`)
    .then((response) => {
      if (response.data != undefined) {
        setContacts(response?.data)
        console.log(response?.data)
      }
    })
    .catch(error => {
      console.log(error)
    })
}, [chats])

console.log(contacts);
// console.log(agentId);

useEffect(() => {
  let agentId = localStorage.getItem("agentId");
  if (agentId != undefined) {
      axiosClient.get(`/buyer-to-agent-chats/${id}/${agentId}`)
      .then(response => {
          setChats(response.data)
          setAgentId(agentId)
          // console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
}, [chatForm])


const startChat = (item: any) => {
    setStartLoading(true)
  axiosClient.get(`/start-buyer-to-agent-chats/${id}/${item.agent_id}`)
     .then(response => {
        setStartLoading(false)
        setChats(response.data)
        setAgentId(item.agent_id)
        localStorage.setItem('agentId', item.agent_id)
        // setTimeout(() => typeof window && window.location.reload(), 1000)
      })
      .catch(error => {
        console.log(error)
      })
}


// Start Chat with an Agent
const onSubmitChat = () => {
  let agentId = localStorage.getItem("agentId");
  let chat_arr = chatForm.split("")
  const num_arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

    for (let i = 0; i < chat_arr.length; i++) {
      let element = chat_arr[i];
      if (num_arr.includes(element)) {
        setValidateChat("For privacy reasons, numbers are not allowed as a chat.")
        
        return setTimeout(() => setValidateChat(""), 5000)
      }
    }

    const payLoad = {
      buyer_id: id,
      agent_id: agentId && agentId,
      sender: "buyer",
      message: chatForm,
    }
    setIsLoading(true)
    axiosClient.post(`/buyer-chat`, payLoad)
     .then(response => {
        setIsLoading(false)
        setChats([...chats, response.data])
        document.querySelector(".chat-input")
        // console.log(response.data)
      })
     .catch(error => {
        setIsLoading(false)
        console.log(error)
        setValidateChat("Input field is required")
      })
  }


  return (
    <div className="flex h-[550px] max-sm:h-h-[600px] overflow-hidden text-sm">
        {/* <!-- Sidebar --> */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-main-100 text-white">
            <h1 className="text-2xl font-semibold">Chats</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
              {/* <!-- Menu Dropdown --> */}
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                  {/* <!-- Add more menu options here --> */}
                </ul>
              </div>
            </div>
          </header>
        
          {/* <!-- Contact List --> */}
          <div className="overflow-y-scroll p-3 mb-9 pb-20">
            <div className="flex items-center max-sm:flex-col max-sm:justify-center max-sm:gap-1 mb-4 cursor-pointer p-2 rounded-md h-full">
              
              <div className="flex flex-col justify-start items-start gap-3">
                {
                  contacts
                  &&
                  contacts.map((item: {
                    agent_chats: any;
                    agent_id: any; agent_name: string | any; }, i: React.Key | null | undefined) => (
                    <div 
                      key={i} 
                      onClick={() => startChat(item)}
                      className={`flex justify-center items-center space-x-1 hover:bg-gray-100 py-1 px-2 rounded ${item.agent_id == agentId ? "bg-main-100/60": ""}`}
                    >
                      <div className="w-7 h-7 bg-gray-300 rounded-full">
                        <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-6 h-6 rounded-full"/>
                      </div>
                      <div className='flex flex-col'>
                          <div className='flex items-center space-x-1'>
                            <h2 className="text-md font-semibold">{item.agent_name}</h2>
                            {
                              item.agent_chats.length > 0 
                              ?
                               item.agent_chats[0].is_read == "No"
                                &&
                                <span className="-inset-1.5 bg-red-500 rounded-full flex justify-center items-center h-5 w-5 font-semibold">
                                  <p className='text-white'>!</p>  
                                </span>
                                :
                                ""
                            }
                          </div>
                          <i></i>
                            {
                              item.agent_chats.length > 0 
                                &&
                              item.agent_chats[0].is_read == "No"
                              ?
                                <p className="text-gray-900 text-xs max-sm:hidden italic truncate w-[60%] font-bold">
                                  {item.agent_chats ? item.agent_chats[0].message : "No message yet"}
                                </p>
                              :
                                <p className="text-gray-600 text-xs max-sm:hidden italic truncate w-[60%]">
                                  {item.agent_chats.length > 0 ? item.agent_chats[0].message : "No message yet"}
                                </p>
                            }
                            <div className='lg:hidden'>....</div>
                      </div>
                     
                    </div>
                  ))
                } 
                {
                 
                }
              </div>
            </div>
            
          </div>
        </div>
        
        {/* <!-- Main Chat Area --> */}
        <div className="flex flex-col justify-between w-full">
            <div className=''>
              {/* <!-- Chat Header --> */}
              <header className="bg-white p-4 text-gray-700">
              {chats ? <h1 className="text-2xl max-sm:text-lg font-semibold"> {chats && chats[0]?.agent?.name}</h1> : "No Messages"}
              </header>
              
              {/* <!-- Chat Messages --> */}
              {
                startLoading
                ?
                  <div className='flex justify-center items-center h-[90%]'>
                    <Loader className='animate-spin'/>&nbsp;Loading Chat... 
                  </div>
                :
                <div className="h-[400px] overflow-y-auto p-4 pb-36">
                  {
                      chats 
                      ?
                      chats.map((chat: {
                        agent: any; sender: string; buyer_id: any; message: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; buyer: { photoPath: any; }; 
}, i: any) => (

                        <div key={i}>
                          {
                            chat.sender === "agent"
                            &&
                            <div className="flex mb-4 cursor-pointer">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-2 ${chat.buyer_id === id ? 'bg-indigo-500 text-white' : ""}`}>
                              <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${chat.agent.photoPath}`} alt="My Avatar" className="w-8 h-8 rounded-full"/>
                              </div>
                              <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                <p className="text-gray-700">{chat.message}</p>
                              </div>
                            </div>
                          }
                        
                          {
                            chat.sender === "buyer"
                            &&
                            <div className="flex justify-end mb-4 cursor-pointer">
                              <div className="flex max-w-96 bg-main-100 text-white rounded-lg p-3 gap-3">
                                <p>{chat.message}</p>
                              </div>
                              <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${chat.buyer.photoPath}`} alt="My Avatar" className="w-8 h-8 rounded-full"/>
                              </div>
                            </div>
                          }
                        </div>
                      ))

                      :

                      <div className='flex justify-center items-center h-full'>Click an Agent to begin the chat</div>
                    }
                </div>
              }
            </div>
            
            {/* <!-- Chat Input --> */}
            
            <footer className="bg-white border-t border-gray-300 p-2 w-full">
                {
                  validateChat
                  &&
                  <div className='absolute bottom-20 p-2 text-white m-3 bg-red-600 w-[60%]'>
                    {validateChat}
                  </div>
                }
                <div className="flex items-center py-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                    <button 
                      onClick={() => setMenuOpen(prev => (!prev))}
                      className='hidden max-sm:block mr-1'>
                      <Ellipsis/>
                    </button>

                    { menuOpen
                        &&
                      <div className='absolute bottom-28 left-[106px] flex flex-col justify-center items-center gap-2 bg-white'>
                        <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                        </button>
                        <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
                        </button>
                      </div>
                    }

                    <div className='flex justify-center items-center gap-2 max-sm:hidden'>
                      <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
                      </button>
                    </div>

                    <textarea
                     rows={1}
                     onChange={(e: any) => setChatForm(e.target.value)}
                     className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 chat-input" placeholder="Your message..."
                    ></textarea>
                    <button
                     type="submit"
                     onClick={onSubmitChat}
                     className="inline-flex justify-center p-1 text-main-100 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        {
                          isLoading
                          ?
                          <Loader className='animate-spin'/>
                          :
                          <svg className="w-7 h-7 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        }
                    </button>
                </div>
            </footer>
        </div>
    </div>
  )
}

export default ChatRoom
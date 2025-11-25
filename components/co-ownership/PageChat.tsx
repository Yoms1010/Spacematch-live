import { useStateContext } from "@/context/ContextProvider";
import { fetchPartnerChatLogic, partnerChatLogic } from "@/lib/actions/partner-chat.action";
import { Send } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";

const PageChat = ({ onNext, userState, client }: { onNext: any, userState: any, client: any }) => {

    const {setGoalMatches} = useStateContext()
    const [chatData, setChatData] = useState<any>([])
    const [chatText, setChatText] = useState<any>("")

    useEffect(() => {
        const fetchChatData = async () => {
            const payLoad = {
                sender_id: client.data.id,
                receiver_id: userState.partner.split(";")[0],
            }
            const response = await fetchPartnerChatLogic(payLoad)
            setChatData(response.chat_data)
            // console.log(response.chat_data);
        }

        setInterval(() => {
            fetchChatData()
        }, 1000);
    }, [])

    async function handleChat() {
        try {
            if (chatText === "") {
                toast.error("Chat field cannot be empty")
            }

            const payLoad = {
                sender_id: client.data.id,
                sender_name: client.data.name,
                receiver_id: userState.partner.split(";")[0],
                receiver_name: userState.partner.split(";")[1],
                message: chatText
            }

            const response = await partnerChatLogic(payLoad);
            setChatText("")
            if (response && response) {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat with <span id="chat-partner-name">{userState.partner.split(";")[1]}</span></h2>
            <div className="border rounded-lg bg-gray-50 h-64 p-4 space-y-3 overflow-y-auto shadow-inner mb-4">
                {/* Mock Chat */}
                {
                    chatData
                    ?
                    <>
                        {
                            chatData.map((chat: any, i: Key) => (
                                chat.sender_id != client.data.id
                                ?
                                <div key={i} className="flex justify-start">
                                    <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                                       {chat.message}
                                    </div>
                                </div>
                                :
                                <div key={i} className="flex justify-end">
                                    <div className="bg-main-100 text-white p-3 rounded-lg max-w-xs">
                                        {chat.message}
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <div className="flex justify-center items-center w-full h-full">
                        <p>No Messages yet...</p>
                    </div>
                }
            </div>
            <div className="flex space-x-2">
                <input type="text" value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="Type your message..." className="flex-grow rounded-lg border-gray-300 shadow-sm p-3 border-b-2 focus:outline-none"/>
                <button onClick={handleChat} className="flex justify-center items-center text-lg text-white font-bold px-3 bg-blue-500 hover:bg-blue-500">
                    <Send/>
                </button>
                <button 
                    onClick={() => {setGoalMatches({partnerId: userState.partner.split(";")[0], partnerName: userState.partner.split(";")[1]}); onNext('page-formalize')}}
                    className="action-btn text-white font-bold py-3 px-3 rounded-lg shadow-md transition duration-300 bg-main-100 hover:bg-main-100"
                >
                    Formalize Co-Ownership
                </button>
            </div>
        </div>
    )
};

export default PageChat;

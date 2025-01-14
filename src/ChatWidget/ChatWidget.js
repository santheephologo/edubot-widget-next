"use client";
import React, { useEffect, useState, useRef } from "react";
import "./Chatbot_App.css";
import { LuSendHorizonal } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import { TbMessageDots } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import HistoryRow from "./HistoryRow";
// import { io } from "socket.io-client";
import UserMsg from "./UserMsg";
import BotMsg from "./BotMsg";
import axios from "axios";
// const socket = io("ws://localhost:5000");

const ChatWidget = ({ bot_id, user_id }) => {
  const base_URL = "http://127.0.0.1:8000/api";
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [threadId, setThreadId] = useState("");
  const [botId, setBotId] = useState("");
  const [clientId, setClientId] = useState("");
  const [viewHistory, setViewHistory] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [viewInitialPrompt, setViewInitialPrompt] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const chatboxRef = useRef(null);
  const [fetchChatList, setFetchChatList] = useState(true);
  

  useEffect(() => {
    if (user_id && bot_id) {
      setBotId(bot_id);
      setClientId(user_id);
    }
  }, [user_id, bot_id]);
  
  useEffect(() => {
    if (typing && viewInitialPrompt) {
      setViewInitialPrompt(false);
    }
    if (messages.length !== 0) {
      setViewInitialPrompt(false);
    }
  }, [typing, viewInitialPrompt, messages]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   setConnectionError(false)
    //   console.log("connected")
    //   socket.emit("get_chat_list", { username: "66836f2ef640cff3cdaa0d50" });
    // });

    
  }, []);
      const fetchChatThread = async (sessionId) => {
    try { 
      if (sessionId !== "") {
        const response = await axios.get(`${base_URL}/chat/get-message/${sessionId}`);
        console.log(response.data)
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
    };

  useEffect(() => {
    // socket.on("chat_list", (data) => {
    //   console.log(data)
    //   setChatList(data)
      // });
    const fetchChatList = async () => {
      try {
        if (sessionId === "" && fetchChatList) {
          const response = await axios.get(`${base_URL}/chat/list-chats/${user_id}/${bot_id}`);
          console.log(response.data.chats)
          setChatList(response.data.chats);
          setFetchChatList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatList();  
    
  }, [fetchChatList]);

  
  useEffect(() => {
      const ws = new WebSocket("ws://localhost:4000");
    // Connect to the WebSocket server
      ws.onopen = () => {
      setConnectionError(false)
      console.log('WebSocket connected');
    };

      ws.onmessage = (event) => {
        if (event.data.sessionId !== sessionId) {
          setSessionId(sessionId);
          setThreadId(threadId);
        }
        setTyping(false);
        const parsedData = JSON.parse(event.data);
        const newMessage = parsedData.message;
        console.log("received ", event.data)
        addMessage("Bot", newMessage);
      
    };

      ws.onclose = () => {
      setConnectionError(true)
      console.log('WebSocket disconnected');
    };
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const addMessage = (sender, message) => {
    
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    console.log(messages)
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN && message.trim() !=="" && !connectionError && !viewHistory) { 
      setInput("");
      setTyping(true);
      addMessage("User", message);
      socket.send(JSON.stringify({
    clientId: user_id,
    botId: bot_id,
    threadId: threadId,
    sessionId: sessionId,
    message: message,
  }));
    }

  };

  const handleSend = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  const toggleFab = () => {
    setIsChatVisible(!isChatVisible);
    setViewHistory(false)
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewChat=()=>{
    if (sessionId !== "") {
      setSessionId("");
    setThreadId("");
    setMessages([]);
    setViewHistory(false);
    setTyping(false);
    setViewInitialPrompt(true);
    setFetchChatList(true);
    }
  }

  return (
    <div className="chat_bot_main__mx__fabs">
      <div className={`chat_bot_main__mx ${isChatVisible ? "chat_bot_main__mx__is-visible" : ""}`}>
        <div className="custom chat_bot_main__mx_header">
          <div className="chat_bot_main__mx_option">
            <div className="chat_bot_main__mx_option_inner">
              <div className="">
                <div className="chat_bot_main__mx_header_img_container">
                  <img
                    className="chat_bot_main__mx_header_img"
                    src="https://www.shutterstock.com/image-vector/avatar-girl-operator-woman-icon-260nw-433466404.jpg"
                    // src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                  {
                    !connectionError && (<span className="online-indicator"></span>)  
                  }
                  {
                    connectionError && (<span className="offline-indicator"></span>)
                  }
                </div>
                
              </div>
              <div className="chat_bot_main__mx_name">
                <span id="chat_bot_main__mx_head">Hologo AI</span>
            {!typing && (
              <>
                {" "}
                <br />{" "}
                <span className="agent type_loader_container">
                  Assistant
                </span>{" "}
                <span className="online"></span>
              </>
            )}
            {typing && (
              <div className="type_loader_container">
                <div className="typing_loader"></div>
              </div>
            )}
              </div>
            </div>
            
            <span
              id="chat_bot_main__mx_fullscreen_loader"
              className="chat_bot_main__mx_fullscreen_loader"
              onClick={toggleFullscreen}
            >
              <i
                className={`fullscreen zmdi ${isFullscreen ? "zmdi-window-restore" : "zmdi-window-maximize"}`}
              ></i>
            </span>
          </div>
        </div>

        <div
          id="chat_bot_main__mx_fullscreen"
          ref={chatboxRef}
          className={`chat_bot_main__mx_conversion chat_bot_main__mx_converse ${(isFullscreen) ? "chat_bot_main__mx_fullscreen" : ""}`}
        >
          {
            !viewHistory ? (
              <>
          {viewInitialPrompt && !connectionError && (
            <>
              <div className="initial_prompt">How may I assist you?</div>
            </>
          )}
  
          {messages.map((msg, index) => (
            <span
              key={index}
              className={`chat_bot_main__mx_msg_item ${msg.sender === "Bot" ? "chat_bot_main__mx_msg_item_admin" : "chat_bot_main__mx_msg_item_user"}`}
            >
              {msg.sender === "Bot" && (
                <div className="chat_bot_main__mx_avatar">
                  <img
                    src="https://www.shutterstock.com/image-vector/avatar-girl-operator-woman-icon-260nw-433466404.jpg"
                    // src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                </div>
              )}
              {msg.message}
            </span>
          ))}
          {
            connectionError && (
              <span
              
              className={`chat_bot_main__mx_msg_item ${"chat_bot_main__mx_msg_item_admin" }`}
            >
              
                <div className="chat_bot_main__mx_avatar">
                  <img
                    src="https://www.shutterstock.com/image-vector/avatar-girl-operator-woman-icon-260nw-433466404.jpg"
                          // src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
                    alt="Agent"
                  />
                </div>
             
             <div className="connection_error">Connection error. Please check your connection</div>
          </span>
              
            )
          }            
              </>
            ) : (
                
                <div className="history-section">
                  <div className="flex justify-between px-4">
                    <div className="chat-history-single-row-header">Chat history</div>
                    <button className="border border-2 px-2 rounded-lg text-gray-500" onClick={handleNewChat}>New chat</button>
                  </div>
                      {chatList.length !==0 && chatList.map((data, index) => (
                        <HistoryRow
                          key={index}
                          data={data}
                          fetchThread={() => { fetchChatThread(data.session_id); setViewHistory(false); setSessionId(data.session_id); setThreadId(data.thread_id); }}
                        />
                      ))}
                  </div>
              )
          }
        </div>
        <div className="fab_field">
          
            
                <a id="fab_send" className="chat_bot_main__mx_body_a chat_bot_main__mx__send_btn" onClick={() => sendMessage(input)}>
                  <i className=""><VscSend /></i>
                </a>
                <textarea
                  id="chat_bot_main__mxSend"
                  name="chat_bot_main__mx_message"
                  placeholder="Send a message"
                  className="chat_bot_main__mx_field chat_bot_main__mx_message chat_bot_main__mx_field_input"
                  value={input}
                  disabled={connectionError || viewHistory}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleSend}
                ></textarea>
              
        </div>
      </div>
      <a
        id="prime"
        className={`fab custom ${isChatVisible ? "chat_bot_main__mx__is-visible  animate-view-spin" : ""}`}
        onClick={()=>{setViewHistory(!viewHistory)}}
          >
              <div className="chatbot_icon_mx_inner">
                  {
                      isChatVisible && (<div className="chatbot_icon_mx"><MdHistory /></div>)
                  }
                  {
                       !isChatVisible && (<div className="chatbot_icon_mx"><MdHistory /></div>)
                  }
             </div>
                  
      </a>
      <a
        id="prime"
        className={`fab custom ${isChatVisible ? "chat_bot_main__mx__is-visible  animate-view-spin" : ""}`}
        onClick={toggleFab}
          >
              <div className="chatbot_icon_mx_inner">
                  {
                      isChatVisible && (<div className="chatbot_icon_mx"><AiOutlineCloseCircle /></div>)
                  }
                  {
                       !isChatVisible && (<div className="chatbot_icon_mx"><TbMessageDots /></div>)
                  }
             </div>
                  
      </a>
    </div>
  );
};

export default ChatWidget;
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const ChatsList = ({
  socket,
  userId,
  unreadMessageCount,
  setUnreadMessageCount,
}) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedPerson = queryParams.get("selectedPerson");

  useEffect(() => {
    setUnreadMessageCount(0);
  }, [setUnreadMessageCount]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/chats/${userId}`);
      const data = await response.json();
  
      // Check if data is an array
      if (Array.isArray(data)) {
        // Only update if the fetched chats are different
        setChats((prevChats) => {
          const newChats = data.filter(
            (chat) => !prevChats.some((prevChat) => prevChat._id === chat._id)
          );
          return [...prevChats, ...newChats];
        });
      } else {
        console.error('Expected an array but received:', data);
      }
    };
  
    fetchChats();
  }, [userId]);
  
  useEffect(() => {
    if (selectedPerson) {
      setSelectedChat(selectedPerson);
      const fetchUserDetails = async () => {
        const response = await fetch(
          `http://127.0.0.1:5000/api/user/${selectedPerson}`
        );
        const data = await response.json();
        const userName = data.name;
        console.log(data)
        // Add new chat only if it doesn't already exist
        setChats((prevChats) => {
          if (!prevChats.some((chat) => chat._id === selectedPerson)) {
            return [
              ...prevChats,
              {
                _id: selectedPerson,
                name: userName,
                lastMessage: null,
                image: "https://via.placeholder.com/50",
              },
            ];
          }
          return prevChats; // Return the existing chats if the new one already exists
        });
      };
      fetchUserDetails();
    }
  }, [selectedPerson]);
  

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        const response = await fetch(
          `http://127.0.0.1:5000/api/messages/${userId}/${selectedChat}`
        );
        const data = await response.json();
        await fetch(
          `http://127.0.0.1:5000/api/messages/markAsRead/${userId}/${selectedChat}`,
          { method: "PUT" }
        );

        // Reset unread count for the selected chat
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === selectedChat
              ? { ...chat, unreadMessagesCount: 0 }
              : chat
          )
        );

        setMessages(Array.isArray(data) ? data : []);
        setIsInitialLoad(true);
      };

      fetchMessages();
      socket.emit("joinChat", { userId, otherUserId: selectedChat });

      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => socket.off("receiveMessage");
    }
  }, [userId, selectedChat, socket]);

  useEffect(() => {
    if (!isInitialLoad) {
      scrollToBottom();
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = () => {
    const currentTime = new Date();
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        sender: userId,
        receiver: selectedChat,
        message: newMessage,
        createdAt: currentTime,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: userId, message: newMessage, createdAt: currentTime },
      ]);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDateSeparator = (msgDate, prevDate) => {
    const currentDate = new Date(msgDate);
    const previousDate = prevDate ? new Date(prevDate) : null;
    if (isNaN(currentDate)) {
      return null;
    }
    const currentDateString = currentDate.toLocaleDateString();
    const previousDateString = previousDate
      ? previousDate.toLocaleDateString()
      : "";
    return currentDateString !== previousDateString ? currentDateString : null;
  };
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r overflow-y-auto mt-16">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <ul>
          {filteredChats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => setSelectedChat(chat._id)}
              className={`p-3 flex items-center justify-between cursor-pointer border-b transition-all duration-300 ease-in-out ${
                chat._id === selectedChat ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={chat.image || "https://via.placeholder.com/50"}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <span className="font-medium text-gray-800">{chat.name}</span>
              </div>
              {chat.unreadMessagesCount > 0 && (
                <span className="bg-red-500 text-white font-medium rounded-full px-2 py-1 text-sm">
                  {chat.unreadMessagesCount}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 bg-white shadow flex items-center">
              <h2 className="text-lg font-semibold">{selectedChat}</h2>
            </div>

            <div
              className="flex-1 p-4 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              {messages.map((msg, index) => {
                const dateSeparator = getDateSeparator(
                  msg.createdAt,
                  messages[index - 1]?.createdAt
                );
                return (
                  <div key={index}>
                    {dateSeparator && (
                      <div className="text-center text-gray-500 mt-4 mb-2">
                        {dateSeparator}
                      </div>
                    )}
                    <div
                      className={`flex mb-2 ${
                        msg.sender === userId ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === userId
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.message}
                        <div className="flex justify-end text-xs mt-1">
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t sticky bottom-0">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;

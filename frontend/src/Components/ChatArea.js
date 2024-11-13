import React, { useState } from "react";

const ChatArea = () => {
  // State to keep track of the currently selected user
  const [selectedUser, setSelectedUser] = useState(null);

  // Dummy data for user messages
  const userMessages = [
    {
      id: 1,
      name: "Luis1994",
      messages: [
        { sender: "Luis1994", content: "Pick me at 9:00 AM" },
        { sender: "Sam", content: "Okay, see you then!" },
      ],
    },
    {
      id: 2,
      name: "Everest Trip 2021",
      messages: [
        { sender: "Everest Trip 2021", content: "Hi Sam, Welcome" },
        { sender: "Sam", content: "Thank you!" },
      ],
    },
    // Add more user messages as needed
  ];

  // Function to handle user click
  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">GoingChat</div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="search IRL"
            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          Sam
        </div>
      </div>
      <div className="flex flex-row justify-between bg-white">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          {userMessages.map((user) => (
            <div
              key={user.id}
              className="flex flex-row py-4 px-2 items-center border-b-2"
              onClick={() => handleUserClick(user.id)}
            >
              <div className="w-1/4">
                <img
                  src={`https://source.unsplash.com/${user.id}/600x600`}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">{user.name}</div>
                <span className="text-gray-500">
                  {user.messages.length > 0 &&
                    user.messages[user.messages.length - 1].content}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full px-5 flex flex-col justify-between">
          {selectedUser && (
            <div className="flex flex-col mt-5">
              {userMessages[selectedUser - 1].messages.map((message, index) => (
                <div key={index} className="flex mb-4">
                  {message.sender !== "Sam" && (
                    <div className="flex items-center">
                      <img
                        src={`https://source.unsplash.com/${selectedUser}/600x600`}
                        className="object-cover h-8 w-8 rounded-full mr-2"
                        alt=""
                      />
                      <div className="py-3 px-4 bg-gray-400 rounded-l-xl rounded-tl-3xl rounded-br-3xl text-white">
                        {message.content}
                      </div>
                    </div>
                  )}
                  {message.sender === "Sam" && (
                    <div className="flex items-center justify-end">
                      <div className="py-3 px-4 bg-blue-400 rounded-r-xl rounded-tr-3xl rounded-bl-3xl text-white">
                        {message.content}
                      </div>
                      <img
                        src={`https://source.unsplash.com/${selectedUser}/600x600`}
                        className="object-cover h-8 w-8 rounded-full ml-2"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Input for typing messages */}
          {/* <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;

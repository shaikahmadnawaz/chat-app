import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server address

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Socket.IO event listeners

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Cleanup on component unmount
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { text: messageInput, timestamp: new Date() };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-blue-300 to-blue-200">
      <div className="bg-white rounded-lg w-96 h-96 p-4 shadow-md">
        <div className="flex flex-col h-full">
          <div className="flex-1 p-2 overflow-y-auto bg-gray-100 rounded-md">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col items-start">
                <div
                  className="bg-blue-500 
                   text-white p-2 rounded-md"
                >
                  {msg.text}
                </div>
                <span className="text-gray-500 text-xs">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300">
            <div className="flex">
              <input
                type="text"
                className="w-full px-2 py-1 border rounded-l-md outline-none"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

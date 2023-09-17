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
    <div className="flex w-full flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="bg-blue-500 text-white p-2 rounded-md">
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-300">
        <input
          type="text"
          className="w-full px-2 py-1 border rounded-md outline-none"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

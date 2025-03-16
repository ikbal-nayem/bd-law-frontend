import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatMessage } from "../services/chatService";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    const message = {
      content: newMessage,
      isBot: false,
      id: Date.now(),
    };

    try {
      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Call RAG API
      const response = await chatMessage(message.content);
      setMessages((prev) => [
        ...prev,
        {
          content: response,
          isBot: true,
          id: Date.now(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="flex-1 overflow-y-auto h-[calc(100vh-270px)]">
        <div className="w-full space-y-4">
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <svg
                  className="icon mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l6.16-3.422a2 2 0 011.886 0l6.16 3.422m-12.324 0l-6.16 3.422a2 2 0 00-1.886 0l-6.16-3.422M12 14l-9-5-9 5 9-5 9 5z"
                  />
                </svg>
                <p className="text-lg font-bold">Welcome to Bangladesh Constitution Law Assistant</p>
                <p className="text-gray-600">Feel free to ask any questions about the constitution.</p>
              </div>
            </div>
          )}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${!message.isBot ? "justify-end" : "justify-start"} mb-2 message ${
                  message.isBot ? "bot" : "user"
                }`}
              >
                <div className="message-content max-w-11/12">
                  <p className="text-sm sm:text-base">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <button type="submit" disabled={isLoading} className="flex items-center justify-center">
          {isLoading ? (
            "Sending..."
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;

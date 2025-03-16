import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatMessage } from '../services/chatService';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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
      setNewMessage('');

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
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${!message.isBot ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-lg p-4 rounded-lg ${message.isBot ? 'bg-white' : 'bg-blue-500 text-white'}`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;

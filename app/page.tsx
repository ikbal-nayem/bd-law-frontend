"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, MoveRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { MessageLoader } from "@/components/message-loader";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({ streamProtocol: 'text' });
  const [showIntro, setShowIntro] = useState(messages.length === 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages, error)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-green-600" />
            <h1 className="text-xl font-semibold text-gray-800">Bangladesh Constitution AI</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <AnimatePresence>
          {showIntro ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-green-200 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center">
                      <Scale className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-center mb-4">Welcome to Bangladesh Constitution AI</h2>

                  <p className="text-gray-600 mb-4 text-center">
                    Ask any question about the Constitution of Bangladesh and get accurate, helpful answers instantly.
                  </p>

                  <div className="grid gap-3 mt-6">
                    <Button onClick={() => setShowIntro(false)} className="bg-green-600 hover:bg-green-700 text-white">
                      Start Chatting <MoveRight className="h-12 w-12 text-white" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowIntro(true)}
                className="mb-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>

              <Card className="border-green-200 shadow-md">
                <CardContent className="p-4 h-[60vh] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Scale className="h-20 w-20 text-green-200 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">Ask about Bangladesh Constitution</h3>
                      <p className="text-gray-500 max-w-md">
                        Ask questions about rights, amendments, articles, or any aspect of the Bangladesh Constitution.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-green-600 text-white rounded-tr-none"
                                : "bg-gray-100 text-gray-800 rounded-tl-none"
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                      {isLoading && <MessageLoader />}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-center"
                        >
                          <div className="bg-red-100 text-red-800 rounded-lg p-3 max-w-[80%]">
                            Error: {error.message || "Something went wrong. Please try again."}
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 border-t border-green-100">
                  <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask about Bangladesh Constitution..."
                      className="flex-grow border-green-200 focus-visible:ring-green-500"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-100 py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto px-4">
          <p>This is an AI assistant may mistake because it's still training.</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ikbal-nayem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Ikbal Nayem
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

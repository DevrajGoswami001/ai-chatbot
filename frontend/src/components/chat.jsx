import React, { useState, useRef, useEffect } from "react";
import api from "../api";
import "../index.css";

function Chat() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  // Start new chat
  const startNewChat = () => {
    setMessages([]);
    setMessage("");
  };

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {

      // SEND MESSAGE TO BACKEND
      const res = await api.post("/", {
        userMessage: currentMessage
      });

      // RECEIVE AI RESPONSE
      const botMessage = {
        role: "bot",
        text: res.data.aiResponse
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Error generating response." }
      ]);

    }

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (

    <div className="app-container">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="sidebar-header">
          AI Chat
        </div>

        <div className="chat-history">

          <div
            className="chat-item"
            onClick={startNewChat}
          >
            New Chat
          </div>

        </div>

      </div>

      {/* Chat Area */}

      <div className="chat-area">

        <div className="chat-header">
          Kaaju miniGPT
        </div>

        <div className="messages">

          {messages.length === 0 && (
            <div className="welcome-text">
              What can I help you with?
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role}`}
            >
              {msg.text}
            </div>
          ))}

          <div ref={messagesEndRef}></div>

        </div>

        {/* Input */}

        <div className="input-wrapper">

          <div className="input-area">

            <button className="icon-btn">+</button>

            <input
              type="text"
              placeholder="Ask anything"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              ➤
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Chat;
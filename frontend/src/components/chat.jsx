import React, { useState } from "react";
import api from "../api";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await api.post("/", { message });

      const botMessage = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error generating response." },
      ]);
    }

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Chat</h2>

      <div style={{ minHeight: "200px", marginBottom: "20px" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.role}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
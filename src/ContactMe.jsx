import React, { useState, useEffect } from "react";
import "./CSS/ContactMe.css";

function ContactMe() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3002/messages");
      if (!response.ok) {
        throw new Error(`Failed to fetch messages. Server responded with ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3002/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageSubject: subject,
          messageEmail: email,
          messageContent: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit message. Server responded with ${response.status}`);
      }

      setSubject("");
      setEmail("");
      setContent("");
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div className="contact-me-cont">
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input id="subjectEnter" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>
        <label>
          Email:
          <input id="emailEnter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Message:
          <textarea id="messageEnter" value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div className="messages">
        <h2>Messages:</h2>
        <ul>
          {messages.map((message) => (
            <li className="messages-list-comp" key={message.id}>
              <strong>Subject:</strong> {message.messageSubject} <br />
              <strong>Email:</strong> {message.messageEmail} <br />
              <strong>Content:</strong> {message.messageContent}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactMe;

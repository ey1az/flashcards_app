import React, { useState, useEffect } from "react";
import "./CSS/ContactMe.css";

function ContactMe() {
    return (
        <div className="contact-me-cont">
            <form onSubmit={handleSubmit}>
                <label>
                    Subject:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Message:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
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
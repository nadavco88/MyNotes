import React, { useState } from 'react';

export default function MessageBox({ message, updateStatus }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusUpdate = (newStatus) => {
    updateStatus(message.id, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="message-box">
      <div onClick={() => setIsOpen(!isOpen)}>
        {message.title}
      </div>
      {isOpen && (
        <div className="message-details">
          <p>{message.content}</p>
          <div className="message-actions">
            <button onClick={() => handleStatusUpdate('unread')}>✉️</button>
            <button onClick={() => handleStatusUpdate('completed')}>✓</button>
            <button onClick={() => handleStatusUpdate('deleted')}>✗</button>
          </div>
        </div>
      )}
    </div>
  );
}

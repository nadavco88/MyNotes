import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('messages')
      .insert([{ title, content, status: 'unread' }]);

    if (error) console.error('Error adding message:', error);
    else {
      setTitle('');
      setContent('');
      alert('Message added successfully!');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Message</button>
      </form>
    </div>
  );
}

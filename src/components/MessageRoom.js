import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import MessageBox from './MessageBox';

export default function MessageRoom({ session }) {
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .from('messages')
      .on('INSERT', payload => {
        setMessages(current => [payload.new, ...current]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: sortOrder === 'asc' });

    if (error) console.error('Error fetching messages:', error);
    else setMessages(data);
  }

  function toggleSortOrder() {
    setSortOrder(current => current === 'desc' ? 'asc' : 'desc');
  }

  useEffect(() => {
    fetchMessages();
  }, [sortOrder]);

  const updateMessageStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('messages')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) console.error('Error updating message status:', error);
    else fetchMessages();
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  return (
    <div className="message-room">
      <h2>Message Room</h2>
      <p>Current Date and Time: {getCurrentDateTime()}</p>
      <div className="message-headers">
        <div className="header">
          Unread
          <button onClick={toggleSortOrder}>
            {sortOrder === 'desc' ? '▼' : '▲'}
          </button>
        </div>
        <div className="header">Completed</div>
        <div className="header">Deleted</div>
      </div>
      <div className="message-columns">
        <div className="column unread">
          {messages.filter(m => m.status === 'unread').map(message => (
            <MessageBox
              key={message.id}
              message={message}
              updateStatus={updateMessageStatus}
            />
          ))}
        </div>
        <div className="column completed">
          {messages.filter(m => m.status === 'completed').map(message => (
            <MessageBox
              key={message.id}
              message={message}
              updateStatus={updateMessageStatus}
            />
          ))}
        </div>
        <div className="column deleted">
          {messages.filter(m => m.status === 'deleted').map(message => (
            <MessageBox
              key={message.id}
              message={message}
              updateStatus={updateMessageStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

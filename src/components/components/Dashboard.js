import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import MessageRoom from './MessageRoom';
import AdminPanel from './AdminPanel';

export default function Dashboard({ session }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
    } else {
      setIsAdmin(data.is_admin);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]); // Add checkAdminStatus to the dependency array

  return (
    <div className="dashboard">
      <h1>MyNotes Dashboard</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      <MessageRoom session={session} />
      {isAdmin && <AdminPanel />}
    </div>
  );
}

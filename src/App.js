import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      {!session ? <Auth /> : <Dashboard key={session.user.id} session={session} />}
    </div>
  );
}

export default App;

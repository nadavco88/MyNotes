import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabaseClient';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!session ? <Auth /> : <Dashboard key={session.user.id} session={session} />}
    </div>
  );
}

export default App;

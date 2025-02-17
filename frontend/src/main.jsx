import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

function Root() {
  const [hydrationComplete, setHydrationComplete] = useState(false);

  useEffect(() => {
    // Simulating hydration by setting the flag to true after any necessary operations
    setHydrationComplete(true); // You can add conditions based on WebSocket or data readiness
  }, []);

  if (!hydrationComplete) {
    return <div>Loading...</div>; // Show a loading state while hydration is in progress
  }

  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);

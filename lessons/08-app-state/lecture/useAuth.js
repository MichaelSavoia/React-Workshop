import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'app/utils';
import { useAppState } from 'app/app-state';

export default function useAuth() {
  const [authAttempted, setAuthAttempted] = useState(false);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth => {
      setAuthAttempted(true);
      setAuth(auth);
    });
  }, []);

  return { auth, authAttempted };
}

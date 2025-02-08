'use client';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const SessionUser = ({ userProvide }: { userProvide: any }) => {
  const [_, setUser] = useLocalStorage('user', null);
  useEffect(() => {
    if (userProvide) {
      setUser(userProvide);
    } else {
      setUser(null);
    }
  }, []);
  return null;
};

export default SessionUser;

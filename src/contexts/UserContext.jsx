import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserById } from '@/services/services';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 'default-user-id', // You'll want to get this from auth
    userName: 'Current User',
    handle: '@currentuser',
    profileImage: DEFAULT_PROFILE_IMAGE
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(currentUser.id);
        setCurrentUser(prev => ({
          ...prev,
          ...userData
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 
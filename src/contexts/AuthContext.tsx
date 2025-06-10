
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (email: string, password?: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    try {
      const usersData = localStorage.getItem('users_data');
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users_data', JSON.stringify(users));
  };

  const signup = async (username: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      const users = getUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        phone
      };

      // Save user with password (in real app, hash the password)
      const userWithPassword = { ...newUser, password };
      users.push(userWithPassword);
      saveUsers(users);

      // Auto login after signup
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const userWithPassword = users.find(u => u.email === email && (u as any).password === password);
      
      if (userWithPassword) {
        const { password: _, ...user } = userWithPassword as any;
        setUser(user);
        localStorage.setItem('auth_user', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const updateProfile = async (email: string, password?: string): Promise<boolean> => {
    try {
      if (!user) return false;

      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], email };
        if (password) {
          (updatedUser as any).password = password;
        }
        
        users[userIndex] = updatedUser;
        saveUsers(users);

        // Update current user state
        const { password: _, ...userWithoutPassword } = updatedUser as any;
        setUser(userWithoutPassword);
        localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

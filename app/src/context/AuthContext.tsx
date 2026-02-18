import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'driver' | 'customer';

export type UserProfile = {
  name: string;
  phone: string;
  role: UserRole;
};

type AuthContextValue = {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isHydrating: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'tareeqk:user';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return;
        }
        const parsed = JSON.parse(raw) as UserProfile;
        if (isMounted) {
          setUser(parsed);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    };

    loadUser();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const persistUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Ignore persistence errors to avoid blocking UI.
      }
    };

    if (!isHydrating) {
      persistUser();
    }
  }, [user, isHydrating]);

  const value = useMemo(
    () => ({ user, setUser, isHydrating }),
    [user, isHydrating],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

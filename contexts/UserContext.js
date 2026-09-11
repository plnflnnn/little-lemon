import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { getData, setData } from '../utils/asyncstorage';

const USER_KEY = 'user';
const SIGNED_IN_KEY = 'isSignedIn';

export const DEFAULT_USER = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  orderStates: true,
  passwordChanges: true,
  specialOrders: true,
  newsletters: true,
  image: '',
};

const UserContext = createContext(null);

const normalizeUser = (data = {}) => ({
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  email: data.email || '',
  phone: data.phone || '',
  orderStates: data.orderStates ?? true,
  passwordChanges: data.passwordChanges ?? true,
  specialOrders: data.specialOrders ?? true,
  newsletters: data.newsletters ?? true,
  image: data.image || '',
});

async function readStoredUser() {
  const stored = await getData(USER_KEY);
  if (stored && typeof stored === 'object') {
    return normalizeUser(stored);
  }
  return { ...DEFAULT_USER };
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => ({ ...DEFAULT_USER }));
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const [storedUser, signedIn] = await Promise.all([
        readStoredUser(),
        getData(SIGNED_IN_KEY),
      ]);
      setUser(storedUser);
      setIsSignedIn(signedIn === true);
    } catch (e) {
      console.error('Failed to load user', e);
      setUser({ ...DEFAULT_USER });
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const persistUser = useCallback(async (nextUser, signedIn) => {
    await setData(USER_KEY, nextUser);
    await setData(SIGNED_IN_KEY, signedIn);
  }, []);

  const signIn = useCallback(async (profile) => {
    const stored = await readStoredUser();
    const sameAccount =
      stored.email &&
      stored.email.trim().toLowerCase() === profile.email.trim().toLowerCase();

    const nextUser = normalizeUser(
      sameAccount
        ? { ...stored, firstName: profile.firstName, email: profile.email }
        : { ...DEFAULT_USER, ...profile }
    );

    await persistUser(nextUser, true);
    setUser(nextUser);
    setIsSignedIn(true);
  }, [persistUser]);

  const saveUser = useCallback(async (nextUserData) => {
    const nextUser = normalizeUser(nextUserData);
    await persistUser(nextUser, true);
    setUser(nextUser);
  }, [persistUser]);

  const logout = useCallback(async () => {
    await persistUser(user, false);
    setIsSignedIn(false);
  }, [persistUser, user]);

  const value = useMemo(
    () => ({
      user,
      isSignedIn,
      isLoading,
      signIn,
      saveUser,
      loadUser,
      logout,
    }),
    [user, isSignedIn, isLoading, signIn, saveUser, loadUser, logout]
  );

  return (
    <UserContext.Provider value={value}>
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

/**
 * AlgoFinex — Authentication State Machine Context
 * Distinguishes: loading | authenticated | unauthenticated | error
 * Completely independent of presentation layers.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, AuthStatus } from "../types/models";
import { authApi } from "../api/authApi";
import { accessApi } from "../api/accessApi";
import { LoginRequest, SignupRequest } from "../types/contracts";

export interface AuthContextType {
  readonly status: AuthStatus;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly user: User | null;
  readonly error: string | null;
  readonly login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  readonly signup: (payload: SignupRequest) => Promise<{ success: boolean; error?: string }>;
  readonly logout: () => Promise<void>;
  readonly refreshUser: () => Promise<void>;
  readonly updateUserTradingView: (username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  status: "loading",
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
  refreshUser: async () => {},
  updateUserTradingView: async () => {},
});

export const useAuth = (): AuthContextType => useContext(AuthContext);

export interface AuthProviderProps {
  readonly children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Synchronize initial session from authApi
  const refreshUser = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const currentUser = await authApi.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to verify session";
      setError(message);
      setStatus("error");
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginRequest) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await authApi.login(credentials);
      setUser(res.user);
      setStatus("authenticated");
      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Authentication failed";
      setError(errorMsg);
      setStatus("unauthenticated");
      return { success: false, error: errorMsg };
    }
  }, []);

  const signup = useCallback(async (payload: SignupRequest) => {
    setStatus("loading");
    setError(null);
    try {
      const res = await authApi.signup(payload);
      setUser(res.user);
      setStatus("authenticated");
      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Signup failed";
      setError(errorMsg);
      setStatus("unauthenticated");
      return { success: false, error: errorMsg };
    }
  }, []);

  const logout = useCallback(async () => {
    setStatus("loading");
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setError(null);
      setStatus("unauthenticated");
    }
  }, []);

  const updateUserTradingView = useCallback(async (username: string) => {
    if (!user) return;
    const updated = await accessApi.updateTradingViewUsername({ tradingViewUsername: username });
    setUser((prev) => (prev ? { ...prev, tradingViewUsername: updated.tradingViewUsername } : null));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        status,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
        user,
        error,
        login,
        signup,
        logout,
        refreshUser,
        updateUserTradingView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

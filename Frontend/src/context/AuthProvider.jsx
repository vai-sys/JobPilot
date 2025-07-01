import { useState,useEffect } from "react";
import AuthContext from "./AuthContext";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate=useNavigate();

  const checkAuth = async () => {
    try {
      const res = await API.get('/auth/verify');
      console.log("verified", res);
      if (res.data && res.status === 200) {
        setUser(res.data);
        navigate("/")
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth verification failed:', err);
      setUser(null);
      
      if (err.response?.status === 401) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [initialized]);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data && res.status === 200) {
        setUser(res.data);
        return { success: true };
      } else {
        return { success: false, error: 'Login failed' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
  
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    } catch (err) {
      console.error('Logout failed:', err);
    
      setUser(null);
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  const value = {
    user,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
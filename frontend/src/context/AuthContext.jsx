import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('krishisetu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (mobile, password, role = 'farmer') => {
    setLoading(true);
    try {
      if (role === 'buyer' || mobile === '8888888888') {
        const buyerUser = {
          id: 99,
          name: 'FreshMart (Verified Buyer)',
          mobile: '8888888888',
          role: 'buyer',
          location: 'Lasalgaon Mandi',
          token: 'demo_buyer_token_2026',
        };
        setUser(buyerUser);
        localStorage.setItem('krishisetu_user', JSON.stringify(buyerUser));
        setLoading(false);
        return { success: true };
      }

      const data = await authService.login(mobile, password);
      const farmerData = {
        id: data.farmer_id,
        name: data.name,
        mobile: data.mobile,
        role: 'farmer',
        token: data.token,
      };
      setUser(farmerData);
      localStorage.setItem('krishisetu_user', JSON.stringify(farmerData));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.detail || 'Login failed. Please check credentials.',
      };
    } finally {
      setLoading(false);
    }

  };

  const tryDemo = async (role = 'farmer') => {
    if (role === 'buyer') {
      return login('8888888888', 'buyer123', 'buyer');
    }
    return login('9999999999', 'demo123', 'farmer');
  };

  const signup = async (name, mobile, location, password, role = 'farmer') => {
    setLoading(true);
    try {
      const data = await authService.signup(name, mobile, location, password);
      const userData = {
        id: data.farmer_id,
        name: data.name,
        mobile: data.mobile,
        role: role,
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem('krishisetu_user', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.detail || 'Signup failed. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('krishisetu_user');
  };

  return (
    <AuthContext.Provider value={{ user, farmer: user, login, signup, tryDemo, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

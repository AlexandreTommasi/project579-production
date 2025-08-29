'use client';

import { useState } from 'react';
import { AuthContext } from './context';
import { AuthProviderProps } from './types';
import { UserRole } from '@/types/auth';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.Player);

  const value = {
    userRole,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

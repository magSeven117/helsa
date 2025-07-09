'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Doctor } from '@helsa/engine/doctor/domain/doctor';
import { Hospital } from '@helsa/engine/hospital/domain/hospital';
import { Patient } from '@helsa/engine/patient/domain/patient';
import { User } from '@helsa/engine/user/domain/user';
import React, { createContext } from 'react';

const SessionContext = createContext<
  { user: User; profile: Primitives<Doctor> | Primitives<Patient> | Primitives<Hospital> } | undefined
>(undefined);

export const SessionProvider = ({
  children,
  user,
  profile,
}: {
  children: React.ReactNode;
  user: User;
  profile: Primitives<Doctor> | Primitives<Patient> | Primitives<Hospital>;
}) => {
  return <SessionContext.Provider value={{ user, profile }}>{children}</SessionContext.Provider>;
};
export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

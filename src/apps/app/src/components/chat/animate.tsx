'use client';
import { AnimatePresence } from 'motion/react';

export const AnimateProvider = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

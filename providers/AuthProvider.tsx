'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	return <SessionProvider refetchInterval={0}>{children}</SessionProvider>;
};

export default AuthProvider;

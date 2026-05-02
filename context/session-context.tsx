'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface SessionContextType {
    sessionId: string;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_KEY = 'laundrica_session_id';

export function SessionProvider({ children }: { children: ReactNode }) {
    const [sessionId, setSessionId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get or create session ID
        let storedSessionId = localStorage.getItem(SESSION_KEY);

        if (!storedSessionId) {
            storedSessionId = uuidv4();
            localStorage.setItem(SESSION_KEY, storedSessionId);
        }

        setSessionId(storedSessionId);
        setIsLoading(false);
    }, []);

    return (
        <SessionContext.Provider value={{ sessionId, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
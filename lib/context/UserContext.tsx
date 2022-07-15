// Creates Context
import { createContext } from 'react';

// Hooks
import { useUserData } from '../hooks/hooks';

// Providing Types for Context State
import { User } from 'firebase/auth';

interface userContextTypes {
    user: User | null | undefined;
    username: string | null;
}

const defaults: userContextTypes = {
    user: null,
    username: null,
};

export const UserContext = createContext<userContextTypes>(defaults);

function UserContextProvider({ children }: { children?: React.ReactNode }) {
    const { user, username } = useUserData();

    return (
        <UserContext.Provider value={{ user: user, username: username }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

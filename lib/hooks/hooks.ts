// Hooks
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase Services
import { auth, firestore } from '../../lib/config/firebaseConfig';

export function useUserData() {
    // Should update "as any" below later
    // Type error from package (I think)
    const [user] = useAuthState(auth as any);
    const [username, setUsername] = useState<string | null>('');

    useEffect(() => {
        let unsubscribe;
        if (user) {
            const ref = firestore.collection('users').doc(user.uid);
            unsubscribe = ref.onSnapshot((snapshot) => {
                setUsername(snapshot.data()?.username);
            });
        } else {
            setUsername(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, username };
}

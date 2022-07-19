// Firebase Configured Services
import { firestore } from '../config/firebaseConfig';

export async function getUserWithUsername(username: string | null | undefined) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

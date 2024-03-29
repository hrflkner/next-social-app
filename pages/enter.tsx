// Hooks
import { useState, useEffect, useContext, useCallback } from 'react';

// Context
import { UserContext } from '../lib/context/UserContext';

// Next Components
import Image from 'next/image';

// Firebase Authentication Service
import {
    auth,
    firestore,
    googleAuthProvider,
} from '../lib/config/firebaseConfig';

// Helper Functions
import debounce from 'lodash.debounce';

function EnterPage({}) {
    const { user, username } = useContext(UserContext);

    return (
        <main>
            {user ? (
                !username ? (
                    <UsernameForm />
                ) : (
                    <SignOutButton />
                )
            ) : (
                <SignInButtonGrid />
            )}
        </main>
    );
}

function SignInButtonGrid() {
    const signInWithGoogle = async () => {
        try {
            auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            console.error('Failed to login with Google:', error);
        }
    };

    return (
        <>
            <section className="auth-button-grid">
                <button className="auth-btn" onClick={signInWithGoogle}>
                    <div className="img-container">
                        <Image
                            width="20px"
                            height="20px"
                            src={'/googlelogo.png'}
                            alt="Google Logo"
                        />
                    </div>
                    <p>Sign in with Google</p>
                </button>
                <button
                    className="auth-btn"
                    onClick={() => auth.signInAnonymously()}
                >
                    <p>Sign in Anonymously</p>
                </button>
            </section>

            {/*Component Styling*/}
            <style jsx>{`
                .auth-button-grid {
                    // Grid Settings
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    grid-gap: 0.5rem;
                    justify-content: center;
                    align-items: center;
                }
                .auth-btn {
                    // Layout
                    height: 5rem;
                    width: 24rem;
                    border-radius: 5px;
                    padding: 0.65rem;
                    background-color: white;
                    color: var(--color-text);
                }
                .img-container {
                    margin-right: 0.5rem;
                    transform: translateY(0.2rem);
                }
                p {
                    // Layout
                    margin: 0;

                    // Typography
                    font-size: 1.6rem;
                }
            `}</style>
        </>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
    const [formValue, setFormValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { user, username } = useContext(UserContext);

    // Change Listener to check database
    // if username already exists or not
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkUsername = useCallback(
        debounce(async (username: string) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        [formValue]
    );

    useEffect(() => {
        checkUsername(formValue);
    }, [checkUsername, formValue]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Check Username Formatting with Regex
        const value = e.target.value.toLowerCase();
        const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Must be > 3 characters
        if (value.length < 3) {
            setFormValue(value);
            setLoading(false);
            setIsValid(false);
        }

        if (regex.test(value)) {
            setFormValue(value);
            setLoading(true);
            setIsValid(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userDoc = firestore.doc(`users/${user?.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        const batch = firestore.batch();
        batch.set(userDoc, {
            username: formValue,
            photoURL: user?.photoURL,
            displayName: user?.displayName,
        });
        batch.set(usernameDoc, { uid: user?.uid });

        try {
            batch.commit();
        } catch (error) {
            console.error('Failed to set username:', error);
        }
    };

    return (
        <>
            {!username && (
                <section>
                    <h3>Choose Username</h3>
                    <form onSubmit={onSubmit}>
                        <UsernameMessage
                            username={formValue}
                            isValid={isValid}
                            loading={loading}
                        />
                        <input
                            name="username"
                            placeholder="Username"
                            value={formValue}
                            onChange={onChange}
                        />
                        <button
                            type="submit"
                            className="btn-green"
                            disabled={!isValid}
                        >
                            Set Username
                        </button>

                        <h3>Debug State</h3>
                        <div>
                            Username: {formValue}
                            <br />
                            Loading: {loading.toString()}
                            <br />
                            Username Valid: {isValid.toString()}
                        </div>
                    </form>
                </section>
            )}
        </>
    );
}

type UsernameMessageProps = {
    username: string;
    isValid: boolean;
    loading: boolean;
};

function UsernameMessage({ username, isValid, loading }: UsernameMessageProps) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        return <p></p>;
    }
}

export default EnterPage;

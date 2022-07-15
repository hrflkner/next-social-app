// Hooks
import { useContext } from 'react';

// Context
import { UserContext } from '../lib/context/UserContext';

// Next Components
import Image from 'next/image';

// Styling
import styled from 'styled-components';

// Firebase Authentication Service
import { auth, googleAuthProvider } from '../lib/config/firebaseConfig';

const StyledSignIn = styled.div`
    button {
        background-color: white;
        color: var(--color-text);
    }

    .img-container {
        margin-right: 10px;
    }

    p {
        display: inline-block;
    }
`;

type Props = {};

function EnterPage({}: Props) {
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
                <div>
                    <p>Sign Up Here:</p>
                    <SignInButton />
                </div>
            )}
        </main>
    );
}

function SignInButton() {
    const signInWithGoogle = async () => {
        try {
            auth.signInWithPopup(googleAuthProvider);
        } catch (error) {
            console.error('Failed to login with Google:', error);
        }
    };

    return (
        <StyledSignIn>
            <button className="btn-google" onClick={signInWithGoogle}>
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
            <button onClick={() => auth.signInAnonymously()}>
                Sign in Anonymously
            </button>
        </StyledSignIn>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
    return null;
}

export default EnterPage;

// Global Styling
import '../styles/globals.css';

// Next Components
import type { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';

// Components
import NavBar from '../components/shared/Navbar';

// Context Provider
import UserContextProvider from '../lib/context/UserContext';

// Toaster Popups Provider
// is Invisible unless action from children is called
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <UserContextProvider>
                <NavBar />
                <Component {...pageProps} />
                <Toaster />
            </UserContextProvider>
        </>
    );
}

export default MyApp;

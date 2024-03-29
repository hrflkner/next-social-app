import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import toast from 'react-hot-toast';

// Components
import Loading from '../components/shared/Loading';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <h2>YO</h2>
            <p>hi</p>
            <Link
                href={{
                    pathname: '/[username]',
                    query: {
                        username: 'Hunter',
                    },
                }}
            >
                <a>Hunter&apos;s Pofile</a>
            </Link>
            <Loading show={true} />
            <div>
                <button onClick={() => toast.success('Hello, Toast!')}>
                    Hot Toast Test
                </button>
            </div>
        </div>
    );
};

export default Home;

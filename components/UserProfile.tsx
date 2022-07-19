// Firebase Auth Service
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

// Next Components
import Image from 'next/image';

interface user {
    user: User;
    // posts: {
    //     title: string;
    //     slug: string;
    //     uid: string;
    //     username: string;
    //     published: boolean;
    //     content: string;
    //     createdAt: Timestamp;
    //     updatedAt: Timestamp;
    //     heartCount: 0;
    // };
}

type PropTypes = {
    user: User | null;
    username: string;
};

export default function UserProfile({ user }: PropTypes) {
    return (
        <>
            <div className="box-center">
                <div className="profile-image-container">
                    <Image
                        width="50px"
                        height="50px"
                        src={user?.photoURL || '/avatar.png'}
                        className="card-img-center"
                        alt="Profile Image"
                    />
                </div>
                <p>
                    <i>{user?.username || '/avatar.png'}</i>
                </p>
                <h1>{user?.displayName}</h1>
            </div>
            <style jsx>{`
                .profile-image-container {
                    margin: 0 auto;
                    max-width: 50px;
                }
            `}</style>
        </>
    );
}

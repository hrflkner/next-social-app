// Next Components
import type { NextPage } from 'next';

// Shared Components
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';

// Helper Functions
import { getUserWithUsername } from '../../lib/helpers/getUserWithUsername';
import { postToJSON } from '../../lib/helpers/postToJSON';

export async function getServerSideProps({ query }: any) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    // JSON serializable data
    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        const postsQuery = userDoc.ref
            .collection('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);
        posts = (await postsQuery.get()).docs.map(postToJSON);
    }

    return {
        props: { user, posts }, // will be passed to the page component as props
    };
}

export default function UserProfilePage({ user, posts }: any) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </main>
    );
}

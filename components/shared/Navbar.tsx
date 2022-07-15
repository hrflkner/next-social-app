// React Hooks
import { useContext } from 'react';

// Next Components
import Link from 'next/link';
import Image from 'next/image';

// Styling
import styled from 'styled-components';

// Context
import { UserContext } from '../../lib/context/UserContext';

const StyledNavBar = styled.nav`
    height: 70px;
    width: 100%;
    background: white;
    color: var(--colors-text);
    position: fixed;
    top: 0;
    padding: 0 10vw;
    font-weight: bold;
    border-bottom: 1px solid var(--color-gray);
    z-index: 99;

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    li {
        border-radius: 50%;
    }
    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
`;

function Navbar() {
    const { user, username } = useContext(UserContext);

    return (
        <StyledNavBar className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button>FEED</button>
                    </Link>
                </li>
                {username && (
                    <>
                        <li>
                            <Link href="/admin">
                                <button>Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <div>
                                    <Image
                                        width="30px"
                                        height="30px"
                                        src={user?.photoURL || '/avatar.png'}
                                        alt="User Profile Picture"
                                    />
                                </div>
                            </Link>
                        </li>
                    </>
                )}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </StyledNavBar>
    );
}

export default Navbar;

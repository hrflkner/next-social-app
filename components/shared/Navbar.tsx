// Next Components
import Link from 'next/link';
import Image from 'next/image';

// Styling
import styled from 'styled-components';

const NavBar = styled.nav`
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

type Props = {};

function Navbar({}: Props) {
    const user = null;
    const username = null;

    return (
        <NavBar className="navbar">
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
                                {/* <Image
                                    src={user}
                                    alt="User Profile Picture"
                                /> */}
                                <a>Hi</a>
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
        </NavBar>
    );
}

export default Navbar;

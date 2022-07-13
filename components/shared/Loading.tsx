import styled from 'styled-components';

const LoadingIcon = styled.div`
    border: 10px solid white;
    border-top: 10px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

type LoadProps = {
    show: boolean;
};

export default function Loading({ show }: LoadProps) {
    return show ? <LoadingIcon /> : null;
}

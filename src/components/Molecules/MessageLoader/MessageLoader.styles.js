import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: gray;
  border-radius: 50%;
  margin: 0 5px;
  animation: ${pulseAnimation} 1.4s infinite ease-in-out both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

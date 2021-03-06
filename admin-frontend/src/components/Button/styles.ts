import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  padding: 0 18px;
  border-radius: 5px;
  border: 0;
  height: 56px;
  font-weight: 500;
  transition: background-color 0.2s;

  color: #f7f6fc;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}

  background-color: #013c64;
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}

  &:hover {
    background-color: ${shade(0.2, '#013C64')};

    ${props =>
      props.backgroundColor &&
      css`
        background-color: ${shade(0.2, props.backgroundColor)};
      `};
  }

  &:disabled {
    background-color: ${shade(0.2, '#013C64')};
    cursor: not-allowed;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

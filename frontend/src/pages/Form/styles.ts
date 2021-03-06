import styled, { css } from 'styled-components';

interface InputGroupProps {
  displayColumn?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;

  h1 {
    margin-bottom: 24px;
  }

  form {
    width: 100%;
    max-width: 700px;
  }

  > div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  & + div {
    margin-top: 24px;
  }
`;

export const InputGroup = styled.div<InputGroupProps>`
  display: flex;

  & + div {
    margin-top: 12px;
  }

  > div {
    & + div {
      margin-left: 12px;
    }
  }

  ${props =>
    props.displayColumn &&
    css`
      flex-direction: column;

      > div {
        & + div {
          margin-left: 0;
          margin-top: 12px;
        }
      }
    `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    flex: 1;
  }
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 12px; 

  label {
    font-size: 20px;
    color: #000;
  }

  small {
    width: 100%;
    color: #000;
    padding: 0.2rem;
  }
  button {
    font-size: 24px;
    flex-basis: 100%;
    margin-top: 1.5rem;
    padding: 16px;

  }
`;

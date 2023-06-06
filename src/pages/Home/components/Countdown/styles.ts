import { styled } from 'styled-components'

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
    padding: 2rem 1rem;
  }
`
export const ColonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  overflow: hidden;
`

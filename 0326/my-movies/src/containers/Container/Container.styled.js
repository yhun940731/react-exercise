import styled from 'styled-components/macro'

export const Container = styled.div`
  max-width: ${({ max }) => max ?? 960}px;
  margin-left: auto;
  margin-right: auto;
`

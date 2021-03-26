import styled from 'styled-components/macro'

const Container = styled.div`
  max-width: ${({ max }) => max ?? 960}px;
  margin-left: auto;
  margin-right: auto;
`

export default Container

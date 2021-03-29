import styled from 'styled-components/macro'

/* -------------------------------------------------------------------------- */

// 컴파운드 컴포넌트 정의

/* -------------------------------------------------------------------------- */

const StyledDialog = styled.section`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 480px;
  min-height: 480px;
  display: flex;
  flex-flow: column;
`

export default StyledDialog

/* -------------------------------------------------------------------------- */

StyledDialog.Modal = styled.div`
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${({ background }) => background ?? 'rgba(0, 0, 0, 0.6)'};
`

StyledDialog.Header = styled.div`
  padding: 1rem;
`

StyledDialog.Body = styled.div`
  padding: 1rem;
`

StyledDialog.Footer = styled.div`
  padding: 1rem;
`

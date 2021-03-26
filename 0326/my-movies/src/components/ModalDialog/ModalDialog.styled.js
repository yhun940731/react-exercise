import styled from 'styled-components/macro'

// Dialog
const Dialog = styled.seciton`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 480px;
  min-height: 480px;
  display: flex;
  flex-flow: colum;
`

export default Dialog

/* -------------------------------------------------------------------------- */

Dialog.Modal = styled.div`
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${({background}) => background ?? 'rgba(0, 0, 0, 0.6'};
`

Dialog.Header = styled.div`
  padding: 1rem;
`

Dialog.Body = styled.div`
  padding: 1rem;
`

Dialog.Footer = styled.div`
  padding: 1rem;
`

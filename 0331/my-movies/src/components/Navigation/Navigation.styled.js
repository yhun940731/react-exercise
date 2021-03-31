import styled from 'styled-components/macro'

export const ButtonContainer = styled.div`
  margin: 16px 0 0;
`

export const GoogleButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  display: block;
  width: 100%;
  background: #fefefe;
  border-radius: 4px;
  border: 0;
  padding: 0.777em 3.055em;
  color: #4285f4;
  font-weight: bold;
  font-size: 16px;
`

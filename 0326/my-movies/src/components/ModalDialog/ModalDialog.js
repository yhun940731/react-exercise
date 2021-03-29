import React from 'react'
import StyledDialog from './ModalDialog.styled'

/* -------------------------------------------------------------------------- */

const DialogContext = React.createContext()

const initState = {
  hasModal: true,
  isShow: false,
}

const reducer = (state, action) => {}

/* -------------------------------------------------------------------------- */

export default function ModalDialog({ config = {}, children, ...restProps }) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initState,
    ...config,
  })

  return (
    <DialogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <StyledDialog {...restProps}>{children}</StyledDialog>
    </DialogContext.Provider>
  )
}

// 함수 컴포넌트
// Context.Consumer 활용 예시
ModalDialog.Header = ({ children }) => {
  return (
    <DialogContext.Consumer>
      {(contextValue) => {
        return <StyledDialog.Header>{children}</StyledDialog.Header>
      }}
    </DialogContext.Consumer>
  )
}

// 클래스 컴포넌트
// static contextType 활용 예시
ModalDialog.Body = class extends React.Component {
  static contextType = DialogContext

  render() {
    console.log(this.context) // {state, dispatch}
    return <StyledDialog.Body>{this.props.children}</StyledDialog.Body>
  }
}

// 함수 컴포넌트
// React.useContext() 훅 활용 예시
ModalDialog.Footer = ({ children }) => {
  // 컨텍스트 훅 (연결된 컨텍스트의 값을 반환)
  // const {state, dispatch} = React.useContext(DialogContext)

  return <StyledDialog.Footer>{children}</StyledDialog.Footer>
}

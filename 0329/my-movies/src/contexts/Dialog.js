import React from 'react'

/* context ------------------------------------------------------------------ */

const DialogContext = React.createContext()

export const DialogProvider = ({ value, ...restProps }) => {
  return <DialogContext.Provider value={value} {...restProps} />
}

/* actions ------------------------------------------------------------------ */

const SHOW_DIALOG = '다이얼로그 표시'
const HIDE_DIALOG = '다이얼로그 감춤'

export const showDialogAction = (payload) => ({
  type: SHOW_DIALOG,
  payload,
})

export const hideDialogAction = (payload) => ({
  type: HIDE_DIALOG,
  payload,
})

/* intialState + reducer ---------------------------------------------------- */

const initialDialog = {
  hasModal: true,
  visible: false,
}

const dialogReducer = (state, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        ...state,
        ...action.payload,
      }
    case HIDE_DIALOG:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

/* context hook ------------------------------------------------------------- */

export const useDialogState = (options) => {
  const [state, dispatch] = React.useReducer(
    dialogReducer,
    initialDialog,
    // [지연 된 초기화]
    // 사용자가 전달한 옵션이 초깃값을 덮어씁니다.
    () => options
  )

  return {
    state,
    dispatch,
  }
}

export const useDialog = () => React.useContext(DialogContext)

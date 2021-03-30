import React from 'react'

/* -------------------------------------------------------------------------- */

export default function useStateCallback(initialState) {
  // 현재 콜백을 저장하기 위한 참조
  const callbackRef = React.useRef(null)
  const [state, setState] = React.useState(initialState)

  const setStateCallback = React.useCallback((state, callback) => {
    // 전달된 콜백을 참조의 현재 값으로 설정
    callbackRef.current = callback
    setState(state)
  }, [])

  React.useEffect(() => {
    // `callbackRef.current`는 초기 렌더링에서 `null`이므로, 업데이트 상태에서만 callback을 실행
    if (callbackRef.current) {
      callbackRef.current(state)
      // 실행 후 콜백 초기화
      callbackRef.current = null
    }
  }, [state])

  return [state, setStateCallback]
}

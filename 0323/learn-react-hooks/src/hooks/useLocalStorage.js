import React from 'react'

// window 멤버 추출
// 로컬 스토리지 별칭(alias) 등록
const { localStorage: storage, JSON } = window

// 외부에서도 사용 가능한 별칭 모듈 내보내기
export const serialize = JSON.stringify
export const deserialize = JSON.parse

/* -------------------------------------------------------------------------- */
// 커스텀 훅 useLocalStorageState() 훅 정의

export function useLocalStorageState(key, initialValue = '') {
  // 이전에 로컬 스토리지에 등록된 키 값을 기억하기 위해 React.useRef 훅을 사용
  const prevKeyRef = React.useRef() // { current }

  // 지연된 초기화
  const [state, setState] = React.useState(() => {
    // 로컬 스토리지에서 key 값으로 저장된 데이터 읽기 시도
    const dataInStorage = storage.getItem(key)
    if (dataInStorage) {
      // 데이터 읽기에 성공
      // JSON 객체의 메서드에 의해 해석(parse)이 필요한 상태
      return deserialize(dataInStorage)
    } else {
      // 데이터 읽기에 실패
      // 만약 initialValue의 데이터 유형이 함수라면? 함수가 아니라면?
      return typeof initialValue === 'function' ? initialValue() : initialValue
    }
  })

  React.useEffect(() => {
    // [비교] 이전 키(prevKeyRef.current) 값과 현재 키(key) 값
    if (key !== prevKeyRef.current) {
      // [조건] 값이 다르면???
      // [행위] 로컬 스토리지에서 이전 키 값을 제거
      storage.removeItem(prevKeyRef.current)
    }
    // [후 행위] 현재 키 값을 이전 키 값을 참조하는 객체 prevKeyRef의 current 값으로 업데이트
    prevKeyRef.current = key

    // 로컬 스토리지 key 값에 데이터 쓰기
    // 데이터가 JS 어떤 데이터 유형도 저장하려 할 경우
    // JSON.stringify() 활용
    storage.setItem(key, serialize(state))
  }, [key, state])

  return [state, setState]
}

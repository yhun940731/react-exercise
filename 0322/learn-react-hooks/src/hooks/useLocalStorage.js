import {useState, useEffect, useRef } from 'react'

const { localStorage: storage, JSON } = window

/* -------------------------------------------------------------------------- */
export const serialize = JSON.stringify
export const deserialize = JSON.parse

// 커스텀 훅 useLocalStorageState() 훅 정의
export function useLocalStorageState(key, initialValue = '') {
  // 이번에 로컬 스토리지에 등록된 키 값을 기억하기 위해 React.useRef 훅을 사용
  const prevKeyRef = useRef() // { current }
  // 지연된 초기화
  const [state, setState] = useState(() => {
    // 로컬 스토리지에서 key 값으로 저장된 데이터 읽기 시도
    const dataInStorage = storage.getItem(key)

    if (dataInStorage) {
      // 데이터는 JSON 객체의 메서드에 의해 해석이 필요
      return deserialize(dataInStorage)
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    // [비교] 이전 키 값과 현재 값
    // 값이 다르면 ? 이전 키 값을 제거하고 current 값을 현재 키 값으로 업데이트 : 유지
    if (key !== prevKeyRef.current) {
      storage.removeItem(prevKeyRef.current)
    }
    prevKeyRef.current = key

    // 로컬 스토리지 key 값에 데이터 쓰기
    // JSON.stringify() 활용
    storage.setItem(key, serialize(state))
  }, [key, state])

  return [state, setState]
}

/* -------------------------------------------------------------------------- */
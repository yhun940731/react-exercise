import { useState, useEffect } from 'react'

const {localStorage: storage} = window
const EMAIL_STATE_IN_STORAGE = 'email'

// 훅은 결국 함수
// React가 공식적으로 제공하주는 빌트인 훅
  // useState()
  // useEffect()

// 사용자가 임의로 제작한 훅
  // const [state, setState] = useLocalStorage(key, initialValue)
function useLocalStorage(key, initialValue) {
  // 초기화
  const [state, setState] = useState(() => {
    // 로컬 스토리지의 key 값에 이미 저장된 값이 있다면 ? 저장된 값으로 상태관리 : 초깃값으로 관리
    const hasStateInStorage = storage.getItem(key)
    if(hasStateInStorage) {
      return hasStateInStorage
    }
    return initialValue
  })

  // 사이드 이펙트
  useEffect(() => {
   storage.setItem(key, state) 
  }, [key, state])

  return [state, setState]
}

export default function GreetingEmail({ initialEmail = 'yhun940731@gmail.com' }) {
  const [email, setEmail] = useLocalStorage(EMAIL_STATE_IN_STORAGE, initialEmail)

  const handleChange = (e) => setEmail(e.target.value)
  const handleFocus = (e) => e.target.select()

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          value={email}
          onFocus={handleFocus}
        />
      </form>
      <p>{email ? `입력된 이메일: ${email}` : '이메일을 입력해주세요.'}</p>
    </div>
  )
}

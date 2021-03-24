// import { useState, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorage'

/* -------------------------------------------------------------------------- */

let count = 1000000000

export default function GreetingEmail({ initialEmail = 'yamoo9@euid.dev' }) {
  // 커스텀 훅 useLocalStorageState() 훅 사용
  const [email, setEmail] = useLocalStorageState('email', () => {
    // 복잡한 연산(계산) 처리 후에.... (시간 지연...)
    while (count-- > 0) {}
    // 초깃값을 반환
    return initialEmail
  })

  const handleChange = (e) => setEmail(e.target.value)
  const handleFocus = (e) => e.target.select()

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </form>
      <p>
        {email ? `입력된 이메일: ${email}` : '당신의 이메일을 입력해주세요.'}
      </p>
    </div>
  )
}

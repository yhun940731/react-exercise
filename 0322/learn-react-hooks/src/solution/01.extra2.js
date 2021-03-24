import { useState } from 'react'

export default function GreetingEmail({ initialEmail = 'yamoo9@euid.dev' }) {
  const [email, setEmail] = useState(initialEmail)
  const handleChange = (e) => setEmail(e.target.value)

  // 추가 실습 2. 포커스 상태 → 선택
  const handleFocus = (e) => e.target.select()

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          onChange={handleChange}
          onFocus={handleFocus}
          value={email}
        />
      </form>
      <p>
        {email ? `입력된 이메일: ${email}` : '당신의 이메일을 입력해주세요.'}
      </p>
    </div>
  )
}

import { useState } from 'react'

// 추가 실습 1. 전달 속성 & 초깃값 설정
export default function GreetingEmail({ initialEmail = 'yamoo9@euid.dev' }) {
  const [email, setEmail] = useState(initialEmail)
  const handleChange = (e) => setEmail(e.target.value)

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" onChange={handleChange} value={email} />
      </form>
      <p>{email ? `입력된 이메일: ${email}` : '이메일을 입력해주세요.'}</p>
    </div>
  )
}

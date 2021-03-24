import { useState } from 'react'

export default function GreetingEmail() {
  // 아래 email 변수 선언을 삭제하고 React.useState() 훅으로 변경해봅니다.
  const [email, setEmail] = useState('')

  // email 상태 변수 값을 업데이트 해봅니다.
  const handleChange = (e) => setEmail(e.target.value)

  return (
    <div>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" onChange={handleChange} />
      </form>
      <p>{email ? `입력된 이메일: ${email}` : '이메일을 입력해주세요.'}</p>
    </div>
  )
}

import { useState, useEffect } from 'react'

const {localStorage: storage} = window
const EMAIL_STATE_IN_STORAGE = 'email'

export default function GreetingEmail({ initialEmail = 'yhun940731@gmail.com' }) {
  const [email, setEmail] = useState(() => storage.getItem(EMAIL_STATE_IN_STORAGE) || initialEmail)

  useEffect(() => {
    console.log('effect');
    storage.setItem(EMAIL_STATE_IN_STORAGE, email)

    // 종속성 배열
    // dependencyList [email]
    // email일 경우만 update
  }, [email])


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

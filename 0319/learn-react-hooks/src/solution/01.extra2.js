import React from 'react'

// input focus 시 전체 선택
export default function GreetingEmail({initialEmail}) {
  const [email, setEmail] = React.useState(initialEmail ?? 'yhun940731@gmail.com')

  const handleChange = (e) => {
    console.log(e.target.value)
    // email 상태 변수 값을 업데이트 해봅니다.
    const updateValue = e.target.value
    // email 상태 값을 업데이트 하는 함수에 전달해서 실행
    setEmail(updateValue)
  }

  const handleFocus = (e) => {
    e.target.select()
  }

  return (
    <div className="practice">
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} onChange={handleChange} onClick={handleFocus}/>
      </form>
      <p>{email ? `입력된 이메일: ${email}` : '이메일을 입력해주세요.'}</p>
    </div>
  )
}

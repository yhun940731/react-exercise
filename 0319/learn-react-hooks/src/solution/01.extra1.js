import React from 'react'

// 컴포넌트 외부에서 초깃값을 설정할 수 있또록 컴포넌트 코드를 업데이트 해보세요.
// <GreetingEmail initialEmail={'blabla@bla.bla'} />
export default function GreetingEmail({initialEmail='yhun940731@gmail.com'}) {
  const [email, setEmail] = React.useState(initialEmail)

  const handleChange = (e) => {
    console.log(e.target.value)
    // email 상태 변수 값을 업데이트 해봅니다.
    const updateValue = e.target.value
    // email 상태 값을 업데이트 하는 함수에 전달해서 실행
    setEmail(updateValue)
  }

  return (
    <div className="practice">
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" onChange={handleChange} />
      </form>
      <p>{email ? `입력된 이메일: ${email}` : '이메일을 입력해주세요.'}</p>
    </div>
  )
}

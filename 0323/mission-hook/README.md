# 미션

이전 실습에서 부여한 비동기 데이터 요청/응답 결과를 처리하는 커스텀 훅에 대한 [풀이](#useFetchData-커스텀-훅)입니다.

<br>

# 커스텀 훅

커스텀 훅은 작은 코드 조각을 공유하고 재사용하는 것을 매우 쉽게 만들어줍니다. 함수를 작성하는 것과 매우 흡사합니다.
그래서 함수를 만들 듯, 다음과 같은 상황에서 커스텀 훅을 만들면 유용하게 활용할 수 있습니다.

> "매번 작성하는 코드를 또 작성하는 기분이 든다. (설마? 데자뷰?)"  
> "같은 코드 로직을 작성하기 귀찮아서 복사해서 붙여넣는 자신이 개발자인지 의심스럽다."

<br>

**커스텀 훅은 일반 함수와 유사하지만, [사용에 제약](https://ko.reactjs.org/docs/hooks-rules.html)이 있다는 점이 다릅니다.**

<br>

<img src="https://i.ibb.co/j6ZWFKh/react-hooks.png" alt="react hooks" height="90" />

<br>
<br>

## 커스텀 훅 활용

커스텀 함수를 만들어 사용하는 경우가 유용한 예시를 살펴보겠습니다.

### ContactCard 컴포넌트

ContactCard 컴포넌트에 작성된 코드는 일반적인 React 컨트롤 요소입니다. 작성에 큰 어려움이 있는 것은 아니지만,
이와 같은 유형을 매번 같은 방법으로 컨트롤 하는 것은 다소 지루할 수 있습니다.

```jsx
function ContactCard({ intialValue, onRemove }) {
  const [name, setName] = useState(intialValue.name || '')
  const [email, setEmail] = useState(intialValue.email || '')
  const [error, setError] = useState(null)

  if (name.trim().length === 0) {
    setError({ message: '이름을 입력하세요.' })
  }

  return (
    <>
      <div className="formControl">
        <label>
          이름 <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>

      <div className="formControl">
        <label>
          이메일 <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <button type="button" onClick={onRemove}>제거</button>

      { error && <p>{error.message}</p> }
    </>
  )
}
```

### 커스텀 훅 useContactModel

ContactCard 컴포넌트에서 사용된 코드 중 다른 곳에서도 재사용 가능할 부분만 분리해 useContactModel 커스텀 훅을 작성할 수 있습니다.


```jsx
function useContactModel({ intialValue: {name, email} }) {

  const [name, setName] = useState(name || '')
  const [email, setEmail] = useState(email || '')

  return {
    error: name.trim().length === 0 ? {message: '이름을 입력하세요.'} : null,

    // <input> 요소에 설정할 props 객체
    inputProps: {
      name: {
        value: name,
        onChange: e => setName(e.target.value),
      },
      email: {
        value: email,
        onChange: e => setEmail(e.target.value),
      },
    }
  }
}
```

### useContactModel 커스텀 훅 활용

작성된 useContactModel 커스텀 훅은 불러온 후 다음과 같이 활용할 수 있어 코드를 효과적으로 관리할 수 있습니다.

```jsx
import useContactModel from './hooks/useContactModel'


function Contact({ intialValue, onRemove }) {
  const {error, inputProps: {name, email}} = useContactModel(intialValue)

  return (
    <>
      <div className="formControl">
        <label>이름 <input {...name} /></label>
      </div>

      <div className="formControl">
        <label>이메일 <input {...email} /></label>
      </div>

      <button type="button" onClick={onRemove}>제거</button>

      { error && <p>{error.message}</p> }
    </>
  )
}
```

<br>

# useFetchData 커스텀 훅

비동기 통신 요청/응답 시, 매번 확인하는 상태(status), 오류(error), 데이터(json)를 손쉽게 재사용할 수 있으면 편하겠죠? 
[useFetchData](https://bit.ly/3lDs4c2) 커스텀 훅을 만들어 재사용 해봅시다.

```jsx
import React from 'react'

const NETWORK_STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

export default function useFetchData(api) {
  const { idle, pending, resolved, rejected } = NETWORK_STATUS

  const [status, setStatus] = React.useState(idle)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setStatus(idle)
    setError(null)

    const fetchData = async () => {
      setStatus(pending)
      try {
        const response = await fetch(api)
        const json = await response.json()
        setStatus(resolved)
        setData(json)
      } catch (error) {
        setStatus(rejected)
        setError(error)
      }
    }

    fetchData(api)
  }, [api, idle, pending, rejected, resolved])

  return [status, error, data]
}
```
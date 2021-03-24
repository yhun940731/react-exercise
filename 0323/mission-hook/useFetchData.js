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
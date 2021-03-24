export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        // 부모가 전달한 props 중에 부모의 state를 변경할 수 있는 함수를 실행한다.
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

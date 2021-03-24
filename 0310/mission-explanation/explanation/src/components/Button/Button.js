import './Button.scss'

// React Component → React Element 또는 children[ReactElement, ...] 또는 null 반환 함수
// React Element   → React.createElement() 가 반환하는 가상 DOM 노드 (정보 객체)

// arrow function
// <button type="button" className="button buttuon__upload button--idle">
//   자식들 (주입)
// </button>

const Button = ({ children, className, ...restProps }) => {
  // {className: 'baroon'}
  return (
    <button
      type="button"
      className={`button ${className}`.trim()}
      {...restProps}
    >
      {/* JSX는 반환하는 루트 요소는 반드시한개여야한다. */}
      {children}
    </button>
  )
}

// 컴포넌트 기본 속성 정의
Button.defaultProps = {
  className: '',
}

export default Button

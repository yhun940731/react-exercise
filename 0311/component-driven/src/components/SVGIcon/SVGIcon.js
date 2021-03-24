// Global CSS | SCSS
// Local(Scoped) CSS ← CRA : CSS Modules | SCSS Modules
// CSS in JS | Styled Coponents, Emotion, ...
// HTML/CSS → React
// React
import './SVGIcon.scss'
import { string } from 'prop-types'

/* -------------------------------------------------------------------------- */

// const PropTypes = {
//   string(props, propName, componentName) {
//     const value = props[propName]
//     const valueType = typeof value
//     const expectType = 'string'
//     if (valueType !== expectType) {
//       const errorMessage = `${componentName} 컴포넌트에 전달 된 ${propName}은 ${expectType} 데이터 유형이 전달되어야 하나, 실제 전달된 속성 값 데이터 유형은 ${valueType}입니다. 확인해주세요. ^^`
//       return new Error(errorMessage)
//     }
//   },
// }

/* -------------------------------------------------------------------------- */

export default function SVGIcon({ src, alt, className, ...restProps }) {
  return (
    <img
      src={`${src}.svg`}
      alt={alt}
      className={`icon ${className}`.trim()}
      {...restProps}
    />
  )
}

SVGIcon.defaultProps = {
  className: '',
  alt: '',
}

// React 컴포넌트는 React에 의해
// 전달 속성(props)의 타입을 검사할 수 있는
// propTypes 속성을 제공합니다.
SVGIcon.propTypes = {
  src: string.isRequired,
  alt: string,
}

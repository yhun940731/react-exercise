import './SVGIcon.scss'

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

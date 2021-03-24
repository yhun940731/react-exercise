import { string, bool, object } from 'prop-types'
import { link } from './LinkA.module.css'

export default function LinkA({
  href,
  isExternal,
  className,
  fgColor,
  bgColor,
  style,
  children,
  ...restProps
}) {
  const target = isExternal ? '_blank' : null
  const rel = isExternal ? 'noopener noreferrer' : null
  const combineClassName = `${link} ${className}`.trim()
  const combineStyle = {
    ...style,
    color: fgColor,
    backgroundColor: bgColor,
  }

  return (
    <a href={href} target={target} rel={rel} className={combineClassName} style={combineStyle} {...restProps}>
      {children}
    </a>
  )
}

LinkA.defaultProps = {
  isExternal: false,
  className: '',
  style: {},
}

LinkA.propTypes = {
  href: string.isRequired,
  isExternal: bool,
  className: string,
  style: object,
}

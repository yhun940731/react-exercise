import React from 'react'
import PropTypes from 'prop-types'
import { headline } from './Heading.module.scss'

export default function Heading({level, children, className: cName, ...restProps}) {
  return React.createElement(`h${level}`, {
      className: `${headline} ${(cName || '')}`.trim(),
      children,
      ...restProps
    })
}

// Heading.defaultProps = {
//   className: '',
// }

Heading.propTypes = {
  level: PropTypes.number.isRequired,
}

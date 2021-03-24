import React from 'react'
import { control } from './Counter.module.scss'

/* -------------------------------------------------------------------------- */

const CountControl = ({
  mode,
  label,
  children,
  onIncrease,
  onDecrease,
  ...restProps
}) => {
  let method = null

  if (mode === 'increment') {
    method = onIncrease
  } else {
    method = onDecrease
  }

  // console.log(method)

  return (
    <button
      aria-label={label}
      onClick={method}
      className={`${control} ${mode}`.trim()}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  )
}

export default CountControl

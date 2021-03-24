import React from 'react'
import { display } from './Counter.module.scss'

export default function CountDisplay({count}) {
  return (
    <output className={display}>{count}</output>
  )
}

import { Link } from 'react-router-dom'
import effect from 'assets/effect.gif'
import { gate, link } from './Effects.module.scss'

export default function Effects({ message, className, ...restProps }) {
  return (
    <div className={`${gate} ${className}`} {...restProps}>
      <img src={effect} alt="" />
      <Link to="/movies" className={link}>
        {message}
      </Link>
    </div>
  )
}

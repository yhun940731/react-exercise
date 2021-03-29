import { container, avatar as imgPath } from './Profile.module.scss'
import { LazyLoadingImg } from 'components'

/* -------------------------------------------------------------------------- */

export default function Profile({ user }) {
  return (
    <figure className={container}>
      <LazyLoadingImg
        src={user.photoURL}
        size={24}
        alt=""
        className={imgPath}
      />
      <figcaption>‪{user.displayName}</figcaption>
    </figure>
  )
}

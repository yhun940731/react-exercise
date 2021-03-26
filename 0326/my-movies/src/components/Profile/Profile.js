import { container, avatar as imgPath } from './Profile.module.scss'

/* -------------------------------------------------------------------------- */

export default function Profile({ user }) {
  return (
    <figure className={container}>
      <img src={user.photoURL} alt="" className={imgPath} />
      <figcaption>‪{user.name}</figcaption>
    </figure>
  )
}

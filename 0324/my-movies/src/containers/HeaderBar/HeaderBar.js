import { bar } from './Headerbar.module.scss'
import { HomeLink, Navigation, Profile } from 'components'

/* -------------------------------------------------------------------------- */

export default function HeaderBar() {
  return (
    <header className={bar}>
      <HomeLink />
      <Navigation>
        <Profile
          user={{ name: 'yamoo9', photoURL: 'https://bit.ly/3f91TZy' }}
        />
      </Navigation>
    </header>
  )
}

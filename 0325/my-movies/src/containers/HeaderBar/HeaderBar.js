import { bar } from './Headerbar.module.scss'
import { HomeLink, Navigation, Profile } from 'components'
import { AuthContext } from 'contexts'

/* -------------------------------------------------------------------------- */

export default function HeaderBar() {
  return (
    <AuthContext.Consumer>
      {(context /* value = {state, dispatch} */) => {
        console.log(context)
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
      }}
    </AuthContext.Consumer>
  )
}

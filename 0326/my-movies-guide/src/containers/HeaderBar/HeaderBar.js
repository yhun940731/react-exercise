/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useAuth, signInAction, signOutAction } from 'contexts'
import { HomeLink, Navigation, Profile } from 'components'
import { bar } from './Headerbar.module.scss'

/* -------------------------------------------------------------------------- */

export default function HeaderBar() {
  const { state: authUser, dispatch } = useAuth()

  const signIn = React.useCallback(() => {
    dispatch(
      signInAction({
        displayName: 'yamoo9',
        photoURL: 'https://bit.ly/3f91TZy',
        email: 'yamoo9@euid.ev',
      })
    )
  }, [])

  const signOut = React.useCallback(() => dispatch(signOutAction()), [])

  return (
    <header className={bar}>
      <HomeLink />
      <Navigation isAuthed={!!authUser} onSignIn={signIn} onSignOut={signOut}>
        {authUser && <Profile user={authUser} />}
      </Navigation>
    </header>
  )
}

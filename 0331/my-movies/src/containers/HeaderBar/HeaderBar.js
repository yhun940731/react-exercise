/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { HomeLink, Navigation, Profile } from 'components'
import { bar } from './Headerbar.module.scss'

/* -------------------------------------------------------------------------- */

export default function HeaderBar() {
  return (
    <header className={bar}>
      <HomeLink />
      <Navigation>
        <Profile />
      </Navigation>
    </header>
  )
}

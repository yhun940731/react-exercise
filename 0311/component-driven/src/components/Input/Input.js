import React from 'react'
import {
  PropTypes
} from 'prop-types'
import {
  ReactComponent as Visible
} from '../../assets/Icon/visible.svg'
import {
  ReactComponent as Invisible
} from '../../assets/Icon/invisible.svg'

const Input = ({ type = 'email', state = 'normal', option = true }) => {
  if (type === 'email') {
    return (
      <>
        <input type = {type} state = {state} option = {'Default'}/>
      </>
    )
  } else if (type === 'password') {
    switch (option) {
      case true:
        return (
          <>
            <input type = {type} option = {option} />
            <Invisible />
          </>
        )
      case false:
        return ( 
          <>
            <input type = {type} option = {option} />
            <Visible />
          </>
        )
      default:
        return ( 
          <>
            <input type = {type} option = {option} />
            <Invisible />
          </>
        )
    }
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['email', 'password']),
}

export default Input
import React from 'react'
import ReactDOM from 'react-dom'
import { string, node } from 'prop-types'

/* -------------------------------------------------------------------------- */

export default function Portal({ children, id }) {
  const mountDomNode = React.useMemo(() => document.getElementById(id), [id])
  return ReactDOM.createPortal(children, mountDomNode)
}

Portal.propTypes = {
  id: string.isRequired,
  children: node,
}

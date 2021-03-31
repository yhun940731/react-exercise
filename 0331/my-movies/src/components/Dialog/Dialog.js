import React from 'react'
import classNames from 'classnames'
import { string, bool, func, node } from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import styles from './Dialog.module.scss'
import { Portal } from 'components'

/* component ---------------------------------------------------------------- */

export default function Dialog({
  hasModal = true,
  visible = false,
  className = '',
  onOpen = null,
  onClose = null,
  onDimClickClose = null,
  label = '다이얼로그 타이틀',
  portalId = 'dialog-container',
  children,
  ...restProps
}) {
  const dialogRef = React.useRef(null)
  const [modalMode] = React.useState(hasModal)

  React.useEffect(() => {
    visible && dialogRef.current.focus()
    visible && onOpen && onOpen(dialogRef.current)
    !visible && onClose && onClose()
  }, [visible, onOpen, onClose])

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onDimClickClose && onDimClickClose()
    }
  }

  const dialog = {
    hidden: {
      opacity: 0,
      x: '-50%',
      y: '-150%',
    },
    visible: {
      opacity: 1,
      y: '-50%',
    },
  }

  return (
    <Portal id={portalId}>
      <AnimatePresence>
        {visible && (
          <motion.div
            role="dialog"
            ref={dialogRef}
            aria-label={label}
            aria-modal={modalMode}
            className={classNames(styles.modal, className)}
            tabIndex={-1}
            key={dialog}
            variants={dialog}
            initial="hidden"
            animate="visible"
            {...restProps}
          >
            {children}
          </motion.div>
        )}
        {modalMode && visible && <Dialog.Modal onClose={handleClose} />}
      </AnimatePresence>
    </Portal>
  )
}

Dialog.propTypes = {
  hasModal: bool,
  visible: bool,
  portalId: string,
  className: string,
  onOpen: func,
  onClose: func,
  onDimClickClose: func,
  label: string,
  chidren: node,
}

/* compound components ------------------------------------------------------ */

Dialog.Modal = function DialogModal({ onClose }) {
  const dim = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <AnimatePresence>
      <motion.div
        role="presentation"
        className={styles.dim}
        key={dim}
        variants={dim}
        initial="hidden"
        animate="visible"
        onClick={onClose}
      />
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */

Dialog.Header = function DialogHeader({
  className = '',
  children,
  ...restProps
}) {
  return (
    <div className={classNames(styles.header, className)} {...restProps}>
      {children}
    </div>
  )
}

Dialog.Header.propTypes = {
  className: string,
  chlidren: node,
}

/* -------------------------------------------------------------------------- */

Dialog.Body = function DialogBody({ className = '', children, ...restProps }) {
  return (
    <div className={classNames(styles.body, className)} {...restProps}>
      {children}
    </div>
  )
}

Dialog.Body.propTypes = {
  className: string,
  chlidren: node,
}

/* -------------------------------------------------------------------------- */

Dialog.Footer = function DialogFooter({
  className = '',
  children,
  ...restProps
}) {
  return (
    <div className={classNames(styles.footer, className)} {...restProps}>
      {children}
    </div>
  )
}

Dialog.Footer.propTypes = {
  className: string,
  chlidren: node,
}

/* -------------------------------------------------------------------------- */

Dialog.CloseButton = function DialogCloseButton({
  label = '다이얼로그 닫기',
  className = '',
  children,
  ...restProps
}) {
  return (
    <button
      type="button"
      className={classNames(styles.closeButton, className)}
      aria-label={label}
      {...restProps}
    >
      <FontAwesomeIcon icon={faTimes} size="2x" />
    </button>
  )
}

Dialog.CloseButton.propTypes = {
  label: string,
  className: string,
  chlidren: node,
}

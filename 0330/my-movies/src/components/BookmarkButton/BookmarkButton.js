import { string, bool, object } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons'
import { button } from './BookmarkButton.module.scss'

/* -------------------------------------------------------------------------- */

export default function BookmarkButton({
  isActive,
  isMobile,
  type,
  label,
  className,
  iconProps,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={`${button} ${className}`.trim()}
      aria-label={`${label} ${!isActive ? '추가' : '제거'}`}
      title={`${label} ${!isActive ? '추가' : '제거'}`}
      {...restProps}
    >
      <FontAwesomeIcon icon={!isActive ? rHeart : sHeart} {...iconProps} />
    </button>
  )
}

BookmarkButton.defaultProps = {
  isActive: false,
  type: 'button',
  label: '북마크',
  className: '',
  iconProps: {},
}

BookmarkButton.propProps = {
  isActive: bool,
  type: string,
  label: string,
  className: string,
  iconProps: object,
}

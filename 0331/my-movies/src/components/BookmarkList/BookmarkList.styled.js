import styled, { keyframes } from 'styled-components'
import { BookmarkButton, LazyLoadingImg } from 'components'

const colors = {
  red: '#ff0c39',
  gray: '#78777c',
}

const shakeKeyframes = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-5px) }
  50% { transform: translateX(2px) }
  75% { transform: translateX(-5px) }
  100% { transform: translateX(0) }
`

/* -------------------------------------------------------------------------- */

const Bookmark = styled.li`
  margin: 0 0 100px;
`

export default Bookmark

/* -------------------------------------------------------------------------- */

Bookmark.List = styled.ul`
  list-style: none;
  padding: ${({ isMobile }) => `${isMobile ? '120px' : '240px'} 32px 32px`};
  display: flex;
  max-width: 960px;
  margin: 0 auto;
  flex-flow: column;
  overflow-x: scroll;
`
Bookmark.List.displayName = 'BookmarkList'

/* -------------------------------------------------------------------------- */

const BookmarkHomeLink = ({
  href,
  external = false,
  isMobile,
  ...restProps
}) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    href={href}
    target={external && '_blank'}
    rel={external && 'noreferrer noopener'}
    {...restProps}
  />
)

Bookmark.HomepageLink = styled(BookmarkHomeLink)`
  float: ${({ isMobile }) => `${isMobile ? 'none' : 'left'}`};
  display: block;
  position: relative;
  margin-right: 20px;
  width: ${({ isMobile }) => `${isMobile ? '100%' : '150px'}`};
  height: auto;

  &::before {
    content: '';
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 0 ${colors.red};
    transition: box-shadow 0.3s ease;
  }

  &:hover {
    &::before {
      box-shadow: inset 0 0 0 8px ${colors.red};
    }
  }
`
Bookmark.HomepageLink.displayName = 'BookmarkHomepageLink'

/* -------------------------------------------------------------------------- */

const Poster = ({ className, isMobile, ...restProps }) => {
  return <LazyLoadingImg className={className} {...restProps} />
}

Bookmark.Poster = styled(Poster)`
  width: ${({ isMobile }) => `${isMobile ? '100%' : 'inherit'}`};
  height: ${({ isMobile }) => `${isMobile ? 'auto' : '200px'}`};
  border: 1px solid ${colors.red};
  filter: contrast(1.2);
`
Bookmark.Poster.displayName = 'BookmarkPoster'

/* -------------------------------------------------------------------------- */

Bookmark.Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ column }) => (column ? 'flex-start' : 'center')};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  margin-top: ${({ isMobile }) => `${isMobile ? '5px' : 0}`};
`
Bookmark.Container.displayName = 'BookmarkContainer'

/* -------------------------------------------------------------------------- */

Bookmark.Button = styled(BookmarkButton)`
  position: relative;
  top: -10px;
  color: ${colors.red};
  animation: ${shakeKeyframes} 0.3s infinite cubic-bezier(0.35, 0.29, 0.4, 0.8);
  animation-play-state: paused;
  transition: color 0.3s ease;

  a {
  }

  &::before {
  }

  &:hover {
    animation-play-state: running;
    color: ${colors.gray};
  }
`
Bookmark.Button.displayName = 'BookmarkButton'

/* -------------------------------------------------------------------------- */

Bookmark.Title = styled.h2`
  margin: ${({ isMobile }) => `${isMobile ? '20px 0 0 0' : '0 3px 0 0'}`};
  font-size: ${({ isMobile }) => `${isMobile ? '22px' : '24px'}`};
`
Bookmark.Title.displayName = 'BookmarkTitle'

/* -------------------------------------------------------------------------- */

Bookmark.Tagline = styled.span`
  margin-top: 5px;
  font-size: ${({ isMobile }) => `${isMobile ? '14px' : '20px'}`};
`
Bookmark.Tagline.displayName = 'BookmarkTagline'

/* -------------------------------------------------------------------------- */

Bookmark.Overview = styled.p`
  margin-top: 20px;
  padding-right: ${({ isMobile }) => `${isMobile ? 0 : '3rem'}`};
  padding-left: ${({ isMobile }) => `${isMobile ? 0 : '170px'}`};
  line-height: 1.7;
`
Bookmark.Overview.displayName = 'BookmarkOverview'

/* -------------------------------------------------------------------------- */

Bookmark.Empty = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${colors.red};
  }
`

import styled, { keyframes } from 'styled-components'
import { BookmarkButton } from 'components'

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
  padding: 2rem;
  display: flex;
  max-width: 960px;
  margin: 60px auto;
  flex-flow: column;
  overflow-x: scroll;
`
Bookmark.List.displayName = 'BookmarkList'

/* -------------------------------------------------------------------------- */

const BookmarkHomeLink = ({ href, external = false, ...restProps }) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    href={href}
    target={external && '_blank'}
    rel={external && 'noreferrer noopener'}
    {...restProps}
  />
)

Bookmark.HomepageLink = styled(BookmarkHomeLink)`
  float: left;
  position: relative;
  margin-right: 20px;
  width: 150px;

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

Bookmark.Poster = styled.img`
  width: inherit;
  height: 200px;
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
  margin: 0 3px 0 0;
`
Bookmark.Title.displayName = 'BookmarkTitle'

/* -------------------------------------------------------------------------- */

Bookmark.Tagline = styled.span`
  margin-top: 5px;
`
Bookmark.Tagline.displayName = 'BookmarkTagline'

/* -------------------------------------------------------------------------- */

Bookmark.Overview = styled.p`
  margin-top: 20px;
  padding-right: 3rem;
  padding-left: 170px;
  line-height: 1.7;
`
Bookmark.Overview.displayName = 'BookmarkOverview'

/* -------------------------------------------------------------------------- */

Bookmark.Empty = styled.div`
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${colors.red};
  }
`

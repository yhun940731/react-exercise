import React from 'react'
import { string, number } from 'prop-types'
import { img, loadingImg } from './LazyLoadingImg.module.scss'

/* -------------------------------------------------------------------------- */
// 참고: https://slashgear.github.io/creating-an-image-lazy-loading-component-with-react/

// 인터색션 옵저버를 참조할 변수
let observer = null

// 커스텀 이벤트 이름
// 하나 이상 이미지 노드에서 이 컴포넌트를 재사용하도록 하게
const LAZY_LOAD_IMG = 'lazyLoadImg'

function onIntersection(
  entries /* intersectionObserverEntry */,
  io /* intersectionObserver */
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target)
      entry.target.dispatchEvent(new CustomEvent(LAZY_LOAD_IMG))
    }
  })
}

const PLACEHOLDER_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

/* -------------------------------------------------------------------------- */

export default function LazyLoadingImg({
  src,
  size = 200,
  alt = '',
  className = '',
  placeholderImage = PLACEHOLDER_IMAGE,
  ...restProps
}) {
  // 이미지 노드를 참조하기 위한 useRef 훅
  const imgRef = React.useRef(null)
  // 이미지 로딩 상태를 처리하기 위한 상태
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    // 이미지 요소 노드 참조
    const imgNode = imgRef.current
    // 이벤트 리스너
    // 커스텀 이벤트 LASY_LOAD_IMG가 호출되면 콜백 실행
    const handleLazyLoadingImg = () => setIsLoaded(true)

    // 이미지 노드가 있을 경우, 커스텀 이벤트 LASY_LOAD_IMG 이벤트 ← 이벤트 리스너 연결
    imgNode && imgNode.addEventListener(LAZY_LOAD_IMG, handleLazyLoadingImg)

    // 클린업
    return () => {
      // 이미지 노드가 있을 경우, 커스텀 이벤트 LASY_LOAD_IMG 이벤트 연결 해제
      imgNode &&
        imgNode.removeEventListener(LAZY_LOAD_IMG, handleLazyLoadingImg)
    }
  }, [])

  React.useEffect(() => {
    // 인터색션 옵저버가 존재하지 않은 경우
    if (!observer) {
      // 인터섹션 옵저버 객체 생성
      observer = new IntersectionObserver(
        // 교차가 감지되면 실행될 콜백 함수
        onIntersection,
        {
          // 이미지 로딩이 80% 이상 진행되면 표시
          threshold: 0.8,
        }
      )
    }

    // 이미지 요소를 옵저버 객체를 통해 교차 여부 감시 설정
    imgRef.current && observer.observe(imgRef.current)
  }, [])

  return (
    <img
      ref={imgRef}
      src={!isLoaded ? placeholderImage : src}
      width={size}
      className={`${!isLoaded ? loadingImg : img} ${className}`.trim()}
      alt={alt}
      {...restProps}
    />
  )
}

/* -------------------------------------------------------------------------- */

LazyLoadingImg.propTypes = {
  src: string.isRequired,
  size: number,
  alt: string,
  className: string,
  placeholderImage: string,
}

// 모듈 css 클래스 이름 패턴
// [컴포넌트이름]_[클래스이름]__[콘텐츠해시]
import { display } from './Copyright.module.scss';

export default function Copyright (props) {
  return (
    <small lang="en" className={display}>
      &copy;Coupang Corp. All rights reserved.
    </small>
  )
}

Copyright.displayName = 'BlaBla'
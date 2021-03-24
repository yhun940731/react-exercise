import { render, screen } from '@testing-library/react'
import HomeLinkA from './HomeLinkA'

// 테스트 스위트
// describe(description, callback)
describe('HomeLinkA 컴포넌트', () => {
  // 테스트 케이스
  test('컴포넌트 렌더링은 정상적으로 구현되는가?', () => {
    // 컴포넌트 렌더링
    render(<HomeLinkA />)
    // 스크린 디버깅
    screen.debug()
  })
})

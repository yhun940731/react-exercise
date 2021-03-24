// React Testing Library 모듈 불러오기
// render, screen 모듈 추출
import { render, screen } from '@testing-library/react';

// Test할 React Component 불러오기
import App from './App';

// 어떤 컴포넌트를 테스트 할 것인지 기술(describe)하시오.

// 첫번째 테스트 케이스
test('App이 정상적으로 렌더링 되는가?', () => {
  // 컨포넌트 랜더링
  render(<App />);

  // 스크린 디버깅
  screen.debug();
});

// 두번째 테스트 케이스
test('App 컴포넌트 링크 요소의 텍스트가 learn react 인가?', () => {
  // 컨포넌트 랜더링
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

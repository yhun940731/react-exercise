// 스토리를 만들 컴포넌트 불러오기
import Button from './Button'

// 스토리 구성 객체 기본 내보내기
export default {
  // 사이드바에 표시할 이름 (옵션: 그룹 포함)
  title: 'DEMO/Button',
  // 렌더링 할 컴포넌트
  component: Button
}

// 스토리 컴포넌트 템플릿
const Template = args => <Button {...args} />

// 기본 컴포넌트 Primary 이름으로 내보내기
export const Primary = Template.bind({}) // <Button>안녕 스토리북 😎</Button>

// Primary 컴포넌트에 전달인자(args) 설정
Primary.args = {
  children: '안녕 스토리북 😎',
}

// Logo
// Template <- Logo
// Logo
// args: { type } // colorful, mono, black

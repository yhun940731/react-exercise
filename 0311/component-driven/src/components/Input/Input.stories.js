// 스토리를 구성할 컴포넌트 불러오기
import Input from './Input'

// 스토리 구성 객체 기본 내보내기
export default {
  // 사이드바에 표시할 이름 (옵션: 그룹 포함)
  title: 'DEMO/Input',
  // 렌더링 할 컴포넌트
  component: Input,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['email', 'password']
      },
    },
    state: {
      control: {
        type: 'select',
        options: ['normal', 'inputed']
      }
    },
    option: {
      control: {
        type: 'select',
        options: ['Default', true, false]
      }
    }
  }
}

const Template = args => < Input {
  ...args
}
/>

// 컴포넌트 렌더링
export const Primary = Template.bind({})

Primary.args = {
  type: 'email',
  state: 'normal',
  option: 'Default'
}
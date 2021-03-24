// 스토리를 구성할 컴포넌트 불러오기
import SVGLogo from './SVGLogo'

// 스토리 구성 객체 기본 내보내기
export default {
  // 사이드바에 표시할 이름 (옵션: 그룹 포함)
  title: 'DEMO/Logo',
  // 렌더링 할 컴포넌트
  component: SVGLogo,
  argTypes: {
    title: {
      description: '로고 이름 (스크린 리더에서 읽힘)',
      defaultValue: { summary: '쿠팡' },
    },
    type: {
      description: '로고 타입 (3개 값 중 하나를 사용해야 함)',
      defaultValue: { summary: 'colorful' },
      control: {
        type: 'select',
        options: ['colorful', 'mono', 'black']
      }
    }
  }
}

const Template = args => <SVGLogo {...args} />

// 컴포넌트 렌더링
export const Primary = Template.bind({})

Primary.args = {
  title: '쿠팡',
  type: 'colorful'
}
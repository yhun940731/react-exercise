import Logo from './Logo'

export default {
  title: 'UI/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: '**로고** 컴포넌트는 서비스를 대표하는 심볼(상징)입니다.',
      },
    },
  },
}

const Template = (args) => <Logo {...args} />

export const ColorLogo = Template.bind({})
export const MonoLogo = Template.bind({})
export const BlackLogo = Template.bind({})

MonoLogo.args = {
  mode: 'mono',
  label: '쿠팡(모노 타입)',
}

BlackLogo.args = {
  mode: 'black',
  label: '쿠팡(블랙 타입)',
}

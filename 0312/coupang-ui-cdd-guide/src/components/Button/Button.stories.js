import Button from './Button'

/* -------------------------------------------------------------------------- */

export default {
  title: 'Form/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          '**버튼** 컴포넌트는 이벤트를 트리거 하는 방식으로 사용자와 상호작용(interaction) 하여 제어(contorl) 하는 그래픽 컨트롤입니다.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    fgColor: { control: 'color' },
    bgColor: { control: 'color' },
    onClick: { action: '버튼 클릭!' },
  },
}

/* -------------------------------------------------------------------------- */

const Template = (args) => <Button {...args} />

export const PrimaryButton = Template.bind({})
export const SecondaryButton = Template.bind({})
export const PrimaryDisabledButton = Template.bind({})
export const SecondaryDisabledButton = Template.bind({})

PrimaryButton.args = {
  children: '로그인',
}
PrimaryButton.storyName = 'Primary'

SecondaryButton.args = {
  children: '회원가입',
  secondary: true,
}
SecondaryButton.storyName = 'Secondary'

PrimaryDisabledButton.args = {
  children: '로그인',
  disabled: true,
}
PrimaryDisabledButton.storyName = 'Primary (Disabled)'

SecondaryDisabledButton.args = {
  children: '회원가입',
  secondary: true,
  disabled: true,
}
SecondaryDisabledButton.storyName = 'Secondary (Disabled)'

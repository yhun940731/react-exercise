import Checkbox from './Checkbox'

/* -------------------------------------------------------------------------- */

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          '**체크박스** 컴포넌트는 GUI 요소(또는 위젯) 중 하나로 사용자로부터 하나 이상 입력을 받을 수 있습니다.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: '체크 상태 변경!' },
  },
}

/* -------------------------------------------------------------------------- */

const Template = (args) => <Checkbox {...args} />

export const Checked = Template.bind({})
export const Unchecked = Template.bind({})
export const CheckedDisabled = Template.bind({})
export const UnheckedDisabled = Template.bind({})

Checked.args = {
  label: '자동 로그인',
  checked: true,
}

Unchecked.args = {
  label: '자동 로그인',
}

CheckedDisabled.args = {
  label: '자동 로그인',
  checked: true,
  disabled: true,
}
CheckedDisabled.storyName = 'Checked (disabled)'

UnheckedDisabled.args = {
  label: '자동 로그인',
  checked: false,
  disabled: true,
}
UnheckedDisabled.storyName = 'Unchecked (disabled)'

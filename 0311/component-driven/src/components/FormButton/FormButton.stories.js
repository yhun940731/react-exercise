import FormButton from './FormButton'

export default {
  title: 'DEMO/FormButton',
  Component: FormButton,
}

const Template = args => <FormButton {...args} />

export const Primary = Template.bind({})
export const Secondary = Template.bind({})
export const Primarydisabled = Template.bind({})
export const Secondarydisabled = Template.bind({})


Primary.args = {
  className: 'Primary',
  children: '버튼'
}

Secondary.args = {
  className: 'Secondary',
  children: '버튼'
}

Primarydisabled.args = {
  className: 'Primary',
  disabled: 'disabled',
  children: '버튼'
}

Secondarydisabled.args = {
  className: 'Secondary',
  disabled: 'disabled',
  children: '버튼'
}
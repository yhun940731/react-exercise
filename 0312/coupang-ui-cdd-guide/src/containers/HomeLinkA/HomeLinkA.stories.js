import HomeLinkA from './HomeLinkA'

export default {
  // 스토리의 구성(카테고리/그룹/컴포넌트이름)
  title: 'UI/HomeLinkA',
  component: HomeLinkA,
}

// 스토리는 이름 모듈로 내보내야 한다.
// 스토리를 1개만 만들면 템플릿이 필요없다.
export const Normal = () => <HomeLinkA>쿠팡! 홈</HomeLinkA>
Normal.storyName = '홈 링크 (기본)'

// 스토리를 2개 이상 만들면 템플릿이 효율적임
const Template = (args) => <HomeLinkA {...args} />

// 템플릿 복제 (표준 JS 함수 복제 방식 활용, Function.prototype.bind)
export const ChangeLevel = Template.bind({})
ChangeLevel.args = {
  level: 4,
  children: '쿠팡!'
}
ChangeLevel.storyName = '홈 링크 (제목 레벨 4)'

export const ChangeLang = Template.bind({})
ChangeLang.args = {
  level: 'en',
  children: 'Coupang!'
}
ChangeLang.storyName = '홈 링크 (영어 언어 변경)'

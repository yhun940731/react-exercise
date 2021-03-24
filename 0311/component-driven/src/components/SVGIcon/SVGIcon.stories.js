// 스토리를 구성할 컴포넌트 불러오기
import SVGIcon from './SVGIcon'
import { getPublickAssets } from 'utils'

// 스토리 구성 객체
const storyConfig = {
  //사이드바에 표시할 컴포넌트 시스템|그룹/컴포넌트 이름
  title: '디자인시스템|UI/SVGIcon',
  component: SVGIcon,
}

export default storyConfig

// 컴포넌트 렌더링
export const Default = <SVGIcon src={getPublickAssets('icon/up-arrow.svg')} alt="" />

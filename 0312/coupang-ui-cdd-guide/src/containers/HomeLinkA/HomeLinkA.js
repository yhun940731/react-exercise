import { number, string, node, object, oneOfType } from 'prop-types'
import Heading from '../../components/Heading/Heading'
import LinkA from '../../components/LinkA/LinkA'

const HomeLinkA = ({level, lang, href, children, className, headingProps, linkAProps}) => {
  return (
    <Heading level={level} lang={lang} {...headingProps}>
      <LinkA href={href} {...linkAProps}>
        {children}
      </LinkA>
    </Heading>
  )
}

// 함수 컴포넌트의 기본 전달 속성 값 설정
HomeLinkA.defaultProps = {
  level: 1,
  lang: 'ko',
  href: '/',
}

HomeLinkA.propTypes = {
  level: oneOfType([number, string]),
  // lang: string,
  href: string,
  children: node,
  headingProps: object,
  linkAProps: object,
}

export default HomeLinkA

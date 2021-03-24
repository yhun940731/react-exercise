import React from 'react'
import { PropTypes } from 'prop-types'
import { ReactComponent as Black } from '../../assets/logo/type=black.svg'
import { ReactComponent as ColorFul } from '../../assets/logo/type=colorful.svg'
import { ReactComponent as Mono } from '../../assets/logo/type=mono.svg'

const SVGLogo = ({title = '쿠팡', type = 'colorful', ...restProps}) => {
  switch (type){
    case 'black': return (
      <a {...restProps}>
        <Black title={title} type={type}/>
      </a>
    )
    case 'colorful':  return (
      <a {...restProps}>
        <ColorFul title={title} type={type}/>
      </a>
    )
    case 'mono' : return (
      <a {...restProps}>
        <Mono title={title} type={type}/>
      </a>
    )
    default : console.log('적절한 type 설정 필요: SVGLogo.js');
  }
}

SVGLogo.propTypes = {
  title: PropTypes.string,
  type : PropTypes.oneOf(['colorful', 'mono', 'black']),
}

export default SVGLogo

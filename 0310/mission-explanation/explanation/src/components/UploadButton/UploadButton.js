import React, { Component } from 'react'
import { getPublicAssets } from 'utils'
import Button from 'components/Button/Button'
import SVGIcon from 'components/SVGIcon/SVGIcon'

// Button, SVGIcon 조립해서 업로드 버튼 컴포넌트를 구성
// 클래스 컴포넌트

export default class UploadButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpload() // this ???
  }

  handleUpload() {
    console.log(this) // this ????
  }

  render() {
    const { icon, children, ...restProps } = this.props

    return (
      <Button {...restProps} onClick={this.handleUpload}>
        {children}
        <SVGIcon
          src={`${getPublicAssets(`icons/${icon}`)}`}
          alt={children || ''}
        />
      </Button>
    )
  }
}

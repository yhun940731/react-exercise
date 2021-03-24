import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getPublicAssets } from 'utils'
import Button from 'components/Button/Button'
import SVGIcon from 'components/SVGIcon/SVGIcon'

/* -------------------------------------------------------------------------- */

export default class UploadButton extends Component {
  // constructor(props) {
  //   super(props)
  //   this.handleUpload() // this ???
  // }

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

UploadButton.propTypes = {
  icon: PropTypes.string.isRequired, // 필수
}

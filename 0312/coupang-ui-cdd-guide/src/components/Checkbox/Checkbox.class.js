// 상태 관리 클래스 컴포넌트
import React, { Fragment, Component } from 'react'
import {string} from 'prop-types'

export default class Cheackbox extends Component {
  // 상태 선언
  state = {
    isChecked: this.props.checked ?? false,
    isDisabled: false,
  }

  // 스태틱 맴버
  static propTypes = {
    id: string.isRequired,
    label: string.isRequired,
  }

  // 인스턴스 맴버
  // lifeCycle method
  
  // 부모에서 전달된 props를 통해 파생된 state를 만들고 싶다.
  // static getDerivedStateFromProps(props, state) {
  //   console.log(props)
  //   console.log('state:', state);

  //   // 상태에 합성될 객체 변환
  //   return {
  //     isChecked: props.checked,
  //     handleChangeFromParent: props.onChange,
  //   }
  // }

  componentDidMount() {
    console.log('초기 체크 상태 값: ', this.state.isChecked)
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('업데이트 체크 상태 값: ', this.state.isChecked)
  }
  
  // 이벤트 리스너로서 인스턴스 맴버로 등록
  // 클래스 필드 선언 구문 활용
  handleChange = (e) => {
    this.setState(
      {
        isChecked: e.target.checked
      },
      () => console.log(this.state)
    )
  }

  // Render
  render() {
    const { id, label } = this.props
    // 클래스 컴포넌트 인스턴스의 상태에서 맴버 추출
    const {isChecked, isDisabled} = this.state

    return (
      <Fragment>
        <input type="checkbox"
          name={id}
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          onChange={e => {
            this.props.onChange()
            this.handleChange(e)
          }}
        />
        <label htmlFor={id}>{label}</label>
      </Fragment>
    )
  }
}

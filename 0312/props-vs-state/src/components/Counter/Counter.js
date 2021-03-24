import React, { Component } from 'react'
import { counter } from './Counter.module.scss'
import CountControl from './CountControl'
import CountDisplay from './CountDisplay'
import { groupCollapsed } from 'utils/groupMessage'

/* -------------------------------------------------------------------------- */

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 9,
    }
    // groupCollapsed('constructor', '생성')
    // this.increase('counstructor')
  }

  static getDerivedStateFromProps(props, state) {
    // props → state = new State Item
    console.log('props:', props) // step
    console.log('state:', state) // count 
    return {
      currentNumber: props.step + state.count,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 이전 상태의 속성과 다음 상태의 속성이 같다면???
    // return false
    return true
  }

  increase = (id) => {
    // console.log(this) // 인스턴스 메서드 내에서 인스턴스 메서드 실행 this === 인스턴스
    // 현재 count 값을 증가
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        console.log('업데이트 됨: ', id)
      }
    )
  }

  decrease = () => {
    // 현재 count 값을 감소
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    // groupCollapsed('render', '렌더')
    // this.increase()
    return (
      <div className={counter}>
        <CountControl
          onDecrease={this.decrease}
          mode="decrement"
          label="카운트 감소"
        >
          {' '}
          -{' '}
        </CountControl>
        <CountDisplay count={this.state.count} />
        <CountControl
          onIncrease={this.increase}
          mode="increment"
          label="카운트 증가"
        >
          {' '}
          +{' '}
        </CountControl>
      </div>
    )
  }

  componentDidMount() {
    // groupCollapsed('did mount', '마운트 이후 시점(1회 실행)')
    // this.increase('componentDidMount')
    console.log('did mount');
  }

  getSnapshotBeforeUpdate(nextProps, nextState) {
    console.log('DOM에 커밋되기 전 스냅샷 가져오기',nextProps, nextState)
    return null
  }

  componentDidUpdate() {
    groupCollapsed(
      'did update',
      '업데이트 이후 시점(연속적으로 업데이트 될 때 마다 실행)'
    )
  }

  componentWillUnmount() {
    console.log('언마운트')
  }
}

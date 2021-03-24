import { useState, Component } from 'react'
import Copyright from '../Copyright/Copyright'
import CheckboxClass from '../Checkbox/Checkbox.class'
import CheckboxFunction from '../Checkbox/Checkbox.function'

// export default class Parent extends Component {
//   state = {
//     isVisible: false,
//   }

//   changeVisibleState() {
//     this.setState({
//       isVisible: !this.state.isVisible
//     })
//   }

//   render() {
//     const { isVisible } = this.state
//     return (
//       <>
//         {/* <CheckboxClass id="check-test" label="라이션스 표시/감춤" checked={isVisible} onChange={() => setIsVisible(!isVisible)}/> */}
//         <CheckboxFunction
//           id="check-kfjwk"
//           label="라이선스 표시/감춤"
//           // [props]
//           // component state
//           checked={isVisible}
//           // component state update function
//           onChange={this.changeVisibleState.bind(this)}
//         />
//         {isVisible ? <Copyright /> : null}
//         {/* { isVisible && <Copyright /> } */}
//       </>
//     )
//   }
// }


// 함수형
// 부모(상위) 컴포넌트 정의
// 함수도 상태를 관리할 수 있다.
const Parent = () => {
  // visible 상태 관리
  // isVisible은 상태
  // setIsVisible은 상태 업데이트 함수
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {/* <CheckboxClass id="check-test" label="라이션스 표시/감춤" checked={isVisible} onChange={() => setIsVisible(!isVisible)}/> */}
      <CheckboxFunction
        id="check-test"
        label="라이선스 표시/감춤"
        // [props]
        // component state
        checked={isVisible}
        // component state update function
        onChange={() => setIsVisible(!isVisible)}
        // onChange={setIsVisible}
      />
      {isVisible ? <Copyright /> : null}
      {/* { isVisible && <Copyright /> } */}
    </>
  )
}

export default Parent

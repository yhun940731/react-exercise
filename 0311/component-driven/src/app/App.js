import React from 'react'
import { data as buttonData } from '../data/button.json'
import UploadButton from 'components/UploadButton/UploadButton'
import SVGLogo from 'components/SVGLogo/SVGLogo'

/* -------------------------------------------------------------------------- */

// 데이터를 불러오기
// console.log(buttonData)

const idleButtonData = buttonData[0]
// console.log(idleButtonData)

/* -------------------------------------------------------------------------- */

// JSX 요소

/*
<button type="button" class="button button__upload button--idle">
업로드
<img src="./src/assets/up-arrow.svg" alt="" height="12" />
</button>
*/

const uploadButtonElement = (
  <button
    type="button"
    className={`button button__upload button--${idleButtonData.state}`}
    onClick={() => console.log('clicked idle state upload button')}
  >
    {idleButtonData.content}
    <img
      src={`${process.env.PUBLIC_URL}/assets/icons/${idleButtonData.icon}.svg`}
      alt=""
      height={12}
    />
  </button>
)

// console.log(uploadButtonElement)

/* -------------------------------------------------------------------------- */

// 배열 데이터 순환하기
// for, white, for-in
// map, forEach, filter, find, ...
const renderedButtonElements = buttonData.map(
  ({ id, state, content, icon }, index) => (
    <button
      key={id}
      type="button"
      className={`button button__upload button--${state}`}
      onClick={() => console.log(`clicked ${state} state upload button`)}
    >
      {content}
      <img
        src={`${process.env.PUBLIC_URL}/assets/icons/${icon}.svg`}
        alt=""
        height={12}
      />
    </button>
  )
)

// console.log(renderedButtonElements)

/* -------------------------------------------------------------------------- */

function App() {
  // return renderedButtonElements // children [element, element, ...]
  // return <Fragment>{renderedButtonElements}</Fragment> // children [element, element, ...]
  return (
    <>
      <SVGLogo />
      <UploadButton icon="up-arrow">업로드</UploadButton>
      {/* <UploadButton icon="spinner">업로드 중</UploadButton>
      <UploadButton icon="check-mark">완료</UploadButton>
      <UploadButton icon="cross">실패</UploadButton>
      <UploadButton icon="not-allowed" disabled>
        업로드
      </UploadButton> */}
    </>
  )
}

export default App

/* -------------------------------------------------------------------------- */

// public/ json
// const publicDir = process.env.PUBLIC_URL
// const buttonDataUrl = `${publicDir}/assets/data/button.json`

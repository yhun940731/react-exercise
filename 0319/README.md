# React 학습 주제

3월 19일 학습할 주제를 간단하게 정리합니다.

<br>

## React Hooks

React 훅(Hooks)은 `props`, `state`, `context`, `refs` 그리고 라이프 사이클 메서드와 같은 React 콘셉트를 좀 더 사용하기 쉽게 제공하는 API입니다. 
이 방법을 사용하면 클래스 컴포넌트를 사용하지 않고도, 컴포넌트의 상태, 사이드 이펙트, 참조 등 React 콘셉트를 함수 컴포넌트에서도 활용할 수 있습니다.
(19일 수업에서 학습하는 훅은 <sup>*</sup> 표기)

React 공식 훅 | API | 비고
--- | --- | ---
상태 관리<sup>*</sup> | `React.useState()` | 클래스 컴포넌트의 상태 관리와 유사
사이드 이펙트<sup>*</sup> | `React.useEffect()` | 라이프 사이클 메서드와 유사
값 또는 DOM 노드 참조<sup>*</sup> | `React.useRef()` | 이전 값을 기억하거나, DOM 노드 참조
컨텍스트 값 참조 | `React.useContext()` | Context API와 함께 학습
복잡한 상태 관리 | `React.useReducer()` | Context API와 함께 학습
콜백(함수) 참조 | `React.useCallback()` | Context API와 함께 학습
고비용 계산 메모 | `React.useMemo()` | 개념 이해 및 활용 예 프리뷰
레이아웃 이펙트 | `React.useLayoutEffect()` | 개념 이해 및 활용 예 프리뷰
명령형 참조 처리(접근성) | `React.useImperativeHandle()` | 개념 이해 및 활용 예 프리뷰
개발도구 커스텀 레이블 표시 | `React.useDebugValue()` | 개념 이해 및 활용 예 프리뷰

### Q & A

#### Q1. 

아래 내용에서 상태를 업데이트 하는 것이 즉시 이뤄지는 것이 아니라는 게 바로 업데이트가 안될 수도 있으니 콜백 함수를 써라 라는 의미인가요? 뒤에 성능 고려 써저 있는데 무슨 의미인지 잘 모르겠습니다.

> `setState()` 메서드를 통해 상태를 업데이트 하는 것은 즉시 이뤄지는 것이 아님에 주의해야 합니다. 이 메서드가 수행하는 것은 일종의 요청이므로 React는 이 요청을 지연 처리할 수 있습니다. (성능 고려)

#### A1.

함수 컴포넌트의 상태 관리 훅 `useState()`는 클래스 컴포넌트의 `setState()`와 다릅니다. 상태 변경 완료를 보장하는 `setState()`의 `callback`을 지원하지 않습니다.
그러므로 상태 변경이 완료된 후 처리하기 위해서는 `useEffect()`를 사용해야 합니다.

관련 실습 및 성능에 관한 이야기는 수업 시간에 이야기 드리겠습니다.

#### Q2.

렌더링이 되지 않아서 변경 후 값을 바로 읽을 수 있다는 게 무슨 말인지 이해가 잘 안갑니다.

> 참조(`ref`) 객체의 `current` 속성은 클래스의 인스턴스 변수처럼 모든 JavaScript의 값을 설정할 수 있고 변경 가능합니다. 
> 참조 객체로 관리되는 변수는 변경되어도 컴포넌트가 다시 렌더링 되지 않습니다. 즉, 변경 후 값을 바로 읽을 수 있습니다.

#### A2.

함수 컴포넌트의 몸체(body)는 클래스 컴포넌트의 `render()`에 해당합니다. 즉, 컴포넌트 생성/업데이트 시에 끊임없이 반복 실행됩니다.
그러므로 클래스와 달리 함수 몸체에 정의 된 모든 변수는 실행될 때마다 다시 정의되는 문제를 가집니다. 이 문제를 해결하기 위해서는 `useRef()`를 사용해야 합니다.
그래서 클래스 컴포넌트의 인스턴스 멤버(변수)와 같이 함수가 다시 실행되더라도 이전 값을 기억할 수 있습니다.

관련 실습은 수업 시간에 진행해보겠습니다.

<br>

## React Form + 비동기 처리 (API 활용)

공개 API를 사용해 외부의 데이터를 비동기(Async) 통신으로 가져와 앱에서 렌더링 하는 과정을 실습합니다.

API | 설명 | 비고
--- | --- | ---
[newsapi](https://newsapi.org) | 월드 와이드 뉴스 검색 서비스로 뉴스 정보를 가져와 앱에서 활용할 수 있습니다. | 회원가입 → API Key 발급 필요
[imgbb](https://api.imgbb.com) | 이미지 업로드 공유 서비스로 앱에서 이미지 업로드/호스팅에 활용할 수 있습니다. | 회원가입 → API Key 발급 필요
[yts.mx](https://yts.mx/api) | 영화 정보 공유 서비스로 영화 데이터를 가져와 앱에서 활용할 수 있습니다. |

### 🍩 뉴스 검색

뉴스 정보를 비동기 방식으로 가져와 앱에 렌더링하는 간단한 실습을 진행합니다.

1. 회원가입 후, API Key를 발급 받습니다. 
1. NewsAPI 엔드포인트(endpoint)를 활용해 데이터를 가져옵니다.
    - [실시간 인기 헤드라인(동향 파악에 활용)](https://newsapi.org/docs/endpoints/top-headlines)
    - [특정 주제 뉴스 기사(뉴스 분석 기사 검색에 활용)](https://newsapi.org/docs/endpoints/everything)
1. 가져온 데이터를 상태에 업데이트 한 후, 리스트 렌더링 합니다.
1. [News API (Node.js Client)](https://github.com/bzarras/newsapi#newsapi)를 활용해 서비스 객체를 만들어 봅니다.

### 🍩 이미지 파일 업로드/호스팅

학습해야 할 주제가 많아, 사전에 작성된 [ImageUploader](https://codesandbox.io/s/react-imiji-eobrodeo-ybk2k) 컴포넌트 예를 살펴보며, API 활용 방법을 리뷰합니다.

1. imgbb 회원가입 → API Key 발급
1. Files 업로드 표준 API 활용 방법 (MDN 문서 참고)
    - [\<input type="file /\>](https://developer.mozilla.org/ko/docs/Web/HTML/Element/Input/file#%EC%98%88%EC%A0%9C)
    - [FormData](https://developer.mozilla.org/ko/docs/Web/API/FormData)
1. [Styled Components](https://styled-components.com/) 라이브러리 활용 방법 프리뷰
1. 함수 컴포넌트의 [React Hooks](https://ko.reactjs.org/docs/hooks-intro.html) 활용 방법 프리뷰

### 🍩 영화 검색

과제로 영화를 검색해 리스트를 표시하는 간단한 앱을 제작해봅니다.
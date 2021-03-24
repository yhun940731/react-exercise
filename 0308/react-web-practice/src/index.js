// window.React 가 존재하는 지 검토
// console.log(React);
// console.log(ReactDOM);

//React API를 사용해서 Virtual DOM Node 생성
// icon element
const iconElement = React.createElement('img', {
  src: '/assets/icons/spinner.svg',
  alt: '',
  height: 12,
  key: 1,
});

// button element
const buttonElement = React.createElement(
  'button', {
    type: 'button',
    className: 'button',  
    disabled: true,
    children: ['업로드 중', iconElement],
  },
);

// 생성된 vNode를 검토
console.log(buttonElement);

// ReactDOM API를 사용해서 가상 DOM 노드를 실제 DOM 노드에 마운트
const rootNode = document.getElementById('root');
ReactDOM.render(buttonElement, rootNode);

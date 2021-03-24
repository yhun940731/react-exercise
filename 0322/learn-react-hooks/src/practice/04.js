/* eslint-disable no-unused-vars */

/* 게임 상수 -------------------------------------------------------------------- */
const SQUARE_VALUES = {
  o: 'O',
  x: '✕',
}

/* 파생 상태를 계산하는 함수 --------------------------------------------------------- */

function calcNextValue(squares) {
  const { o, x } = SQUARE_VALUES
  // ○의 개수
  const oLength = squares.filter((square) => square === o).length
  // ✕의 개수
  const xLength = squares.filter((square) => square === x).length
  // 결과 반환
  return oLength === xLength ? x : o
}

function calcWinner(squares) {
  // 승리 조건 검사를 위한 라인 집합
  const lines = [
    // 수평선
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 수직선
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 대각선
    [0, 4, 8],
    [2, 4, 6],
  ]

  // 라인 집합의 개별 항목 순환 조사
  for (let i = 0, l = lines.length; i < l; ++i) {
    // 개별 항목의 각 원소 추출
    const [x, y, z] = lines[i]
    // 첫번째 원소의 값 할당
    const squareX = squares[x]
    // 첫번째, 두번째, 세번째 원소 값이 모두 같은 지 검사
    if (squareX && squareX === squares[y] && squareX === squares[z]) {
      // 모든 원소의 값이 같다면 승리 조건 충족!
      return squareX
    }
  }

  return null
}

function calcStatus(winner, squares, nextValue) {
  // 조건 1. 게임 종료
  if (winner) {
    return `게임 승자는 ${winner}`
  }
  // 조건 2. 게임 중, 모든 값이 채워져도 승자가 없다면
  else if (squares.every(Boolean)) {
    return `게임 결과는 무승부!`
  }
  // 조건 3. 게임 중, 아직 모든 값이 채워지지 않았다면
  else {
    return `다음 플레이어는 ${nextValue}`
  }
}

/* ----------------------------------------------------------------------------- */

function Board() {
  /* 일반 상태 -------------------------------------------------------------------- */

  // squares는 컴포넌트의 상태입니다. React.useState() 훅을 사용해 상태 관리합니다.
  const squares = Array(9).fill(null)

  /* 파생 상태 -------------------------------------------------------------------- */

  // 틱택토 게임은 다음의 "파생된 상태"가 필요합니다.
  // - nextValue → ○ 또는 ✕
  // - winner    → ○ 또는 ✕ 또는 null
  // - status    → `${winner} 승리!` 또는 `무승부!` 또는 `다음 플레이어는 ${nextValue}`)

  /* 함수 ----------------------------------------------------------------------- */

  // 이 함수는 게임 보드의 스퀘어를 클릭할 때 실행됩니다.
  // 매개변수 'squareIndex'는 3✕3 정사각형의 중앙을 사용자가 클릭한 경우 '4' 값을 전달 받습니다.
  // [
  //   '0', '1', '2',
  //   '3', '4', '5',
  //   '6', '7', '8',
  // ]
  const selectSquare = (squareIndex) => {
    // 0. 게임 종료 또는 클릭한 게임 보드의 스퀘어 값이 채워진 경우, 상태 변경을 중단해야 합니다.
    //
    // React 프로그래밍에서 컴포넌트의 상태를 직접 변경하는 것은 문제를 유발합니다.
    // 그러므로 squares 상태를 복사한 후, 변경하는 것이 좋습니다.
    //
    // 1. squares 상태를 복사합니다. (배열 복제)
    //
    // 2. 선택된 스퀘어의 값을 복사한 sqauresCopy의 squareIndex에 설정합니다. (배열[인덱스] = 값)
    //
    // 3. 복사, 변경된 squaresCopy를 squares 상태로 업데이트 합니다. (setState(업데이트 된 값))
  }

  const restart = () => {
    // 게임 보드의 squares 상태를 초기화 합니다.
    //
  }

  const renderSquare = (index) => (
    <button
      type="button"
      className="button--square"
      onClick={() => selectSquare(index)}
    >
      {squares[index]}
    </button>
  )

  return (
    <>
      {/* 아래 div.status 요소에 상황 별 상태 메시지가 출력되도록 설정합니다. */}
      <div className="info__status">현재 상황 메시지</div>

      <div className="board__row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board__row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board__row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <button type="button" className="button--restart" onClick={restart}>
        게임 다시 시작
      </button>
    </>
  )
}

/* -------------------------------------------------------------------------- */

export default function TicTacToe() {
  return (
    <div className="game">
      <div className="board">
        <Board />
      </div>
    </div>
  )
}

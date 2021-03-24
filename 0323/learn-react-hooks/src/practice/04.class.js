import { Component } from 'react'

/* 글로벌 ---------------------------------------------------------------------- */
const {
  localStorage: storage,
  JSON: { stringify: serialize, parse: deserialize },
} = window

/* 게임 상수 -------------------------------------------------------------------- */

const SQUARE_VALUES = {
  o: 'O',
  x: '✕',
}

const RESET_SQUARE_VALUES = Array(9).fill(null)

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

// 클래스 컴포넌트 → [함수 컴포넌트 + 훅]으로 리팩터링 해봅니다.

class Board extends Component {
  // 컴포넌트 상태
  state = {
    squares: deserialize(storage.getItem('squares')) || RESET_SQUARE_VALUES,
  }

  // 라이프 사이클 훅
  static getDerivedStateFromProps(props, state) {
    const { squares } = state

    // 틱택토 게임은 다음의 "파생된 상태"가 필요합니다.
    // - nextValue → ○ 또는 ✕
    const nextValue = calcNextValue(squares)
    // - winner    → ○ 또는 ✕ 또는 null
    const winner = calcWinner(squares)
    // - status    → `${winner} 승리!` 또는 `무승부!` 또는 `다음 플레이어는 ${nextValue}`)
    const status = calcStatus(winner, squares, nextValue)

    return {
      nextValue,
      winner,
      status,
    }
  }

  componentDidMount() {
    this.saveLocalStorage()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.squares !== this.state.squares) {
      this.saveLocalStorage()
    }
  }

  // 메서드
  saveLocalStorage = () => {
    const { squares } = this.state
    storage.setItem('squares', serialize(squares))
  }

  selectSquare = (squareIndex) => {
    const { winner, squares, nextValue } = this.state

    if (winner || squares[squareIndex]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[squareIndex] = nextValue

    this.setState({
      squares: [...squaresCopy],
    })
  }

  restart = () => {
    // 게임 보드의 squares 상태를 초기화 합니다.
    this.setState(
      {
        squares: RESET_SQUARE_VALUES,
      },
      () => this.saveLocalStorage()
    )
  }

  renderSquare = (index) => (
    <button
      type="button"
      className="button--square"
      onClick={() => this.selectSquare(index)}
    >
      {this.state.squares[index]}
    </button>
  )

  render() {
    const {
      state: { status },
      renderSquare,
      restart,
    } = this

    return (
      <>
        <div className="info__status">{status}</div>

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

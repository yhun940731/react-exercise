import React from 'react'

/* 초기 북마크 상태 ----------------------------------------------------------------- */

const initialBookmark = []

/* 북마크 리듀서 (순수) 함수 ---------------------------------------------------------- */

function bookmarkReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.create:
      return [...state, action.payload]
    case ACTION_TYPES.update:
      return state.map((bookmark) => {
        return bookmark.id === action.payload.id ? action.payload : bookmark
      })
    case ACTION_TYPES.delete:
      return state.filter(({ id }) => id !== action.payload.id)
    case ACTION_TYPES.read:
    default:
      return state
  }
}

/* 액션 상태 ----------------------------------------------------------------------- */

export const ACTION_TYPES = {
  create: 'create',
  update: 'update',
  delete: 'delete',
  read: 'read',
}

/* 액션 크리에이터 ------------------------------------------------------------------ */

export const addBookmarkAction = (newBookmark) => {
  console.log('[디버깅]: ', ACTION_TYPES.create)
  return {
    type: ACTION_TYPES.create,
    payload: newBookmark,
  }
}

export const updateBookmarkAction = (newBookmark) => {
  console.log('[디버깅]: ', ACTION_TYPES.update)
  return {
    type: ACTION_TYPES.update,
    payload: newBookmark,
  }
}

export const deleteBookmarkAction = (newBookmark) => {
  console.log('[디버깅]: ', ACTION_TYPES.delete)
  return {
    type: ACTION_TYPES.delete,
    payload: newBookmark,
  }
}

export const readAllBookmarkAction = () => {
  console.log('[디버깅]: ', ACTION_TYPES.read)
  return {
    type: ACTION_TYPES.read,
  }
}

/* 북마크 컨텍스트 객체 생성 ----------------------------------------------------------- */

const BookmarkContext = React.createContext()

// 북마크 컨텍스트 프로바이더 래퍼 컴포넌트 내보내기
export const BookmarkProvider = (props) => {
  // useReducer 훅을 사용해 state, dispatch 추출
  const [state, dispatch] = React.useReducer(bookmarkReducer, initialBookmark)

  // 공급할 값
  const provideValue = {
    state,
    dispatch,
  }

  return <BookmarkContext.Provider value={provideValue} {...props} />
}

/* 고차 컴포넌트(HOC): 컨텍스트 값을 context props로 전달 ---------------------------------- */

export const withBookamark = (Comp) => {
  class WithBookmark extends React.Component {
    static contextType = BookmarkContext
    render() {
      return <Comp context={this.context} {...this.props} />
    }
  }
  return WithBookmark
}

/* 커스텀 훅: 컨텍스트 값을 반환 -------------------------------------------------------- */

export const useBookmark = () => React.useContext(BookmarkContext)

import React from 'react'

// 컴포넌트 정의
// Dialog
export default function Dialog({children}) {
  return(
    <div className="dialog">
      <div className="dialog__header">
        <h3 className="dialog__title">{children}</h3>
      </div>
      <div className="dialog__body">
      {children}
      </div>
      <div className="dialog__footer">
      {children}
        <button type="button" className="dialog__closeButton" aria-label="다이얼로그 닫기">
          X
          <button>
            b
          </button>
        </button>
      </div>
    </div>
  )
}

// Dialog.Modal
// Dialog.Header
// Dialog.Body
// Dialog.Footer
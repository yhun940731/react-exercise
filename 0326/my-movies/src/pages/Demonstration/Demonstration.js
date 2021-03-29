import { A11yHidden } from 'components'
import { ModalDialog } from 'components'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <A11yHidden as="h2">Demonstration</A11yHidden>
      <ModalDialog>
        <ModalDialog.Header>
          <h3>모달 다이얼로그</h3>
        </ModalDialog.Header>
        <ModalDialog.Body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            sunt?
          </p>
        </ModalDialog.Body>
      </ModalDialog>
    </div>
  )
}

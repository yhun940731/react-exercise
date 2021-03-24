// function component
export default function CountControl ({ label, onUpdate, children, step = 1 }) {
  const updateCount = () => {
    if (children.includes('-')) {
      step = step * -1
    }

    onUpdate(step)
  }

  return (
    <button type="button" onClick={updateCount} aria-label="{label}">
      {children}
    </button>
  )
}
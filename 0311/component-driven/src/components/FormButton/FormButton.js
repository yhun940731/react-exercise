import './FormButton.scss'

const FormButton = ({ className='', disabled, children, ...restProps }) => {
  return (
    <button className = {`button ${className}`} disabled = {disabled}>
    {children}
    </button>
  )
};

export default FormButton;

const Modal = ({ className='', backdrop, children }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${backdrop} z-50 p-6`}>
       <div className={`${className}`}> 
          {children}
       </div>
    </div>
  )
}

export default Modal

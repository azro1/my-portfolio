import { forwardRef } from "react"

const Modal = forwardRef(({ className='', backdrop, children }, ref) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${backdrop} z-50 p-4`}>
       <div className={`${className}`} ref={ref}> 
          {children}
       </div>
    </div>
  )
});

export default Modal

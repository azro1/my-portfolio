
const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-modal-translucent z-50">
       <div className="bg-frostWhite p-8 w-96 mx-auto rounded-md"> 
          {children}
       </div>
    </div>
  )
}

export default Modal

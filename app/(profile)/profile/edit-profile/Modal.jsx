
const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-modal-translucent z-50 p-6">
       <div className="bg-softGray p-6 sm:p-10 w-[420px] mx-auto rounded-xl"> 
          {children}
       </div>
    </div>
  )
}

export default Modal

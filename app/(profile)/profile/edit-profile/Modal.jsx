
const Modal = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-modal-translucent">
       <div className="bg-frostWhite p-8 max-w-sm my-64 mx-auto"> 
          {children}
       </div>
    </div>
  )
}

export default Modal

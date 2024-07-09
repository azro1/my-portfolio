
const Modal = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-full max-w-sm h-50 bg-gray-500">
       <div className="p-8"> 
          {children}
          
       </div>
    </div>
  )
}

export default Modal


const Modal = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 w-1/2 h-50 bg-gray-500">
       <div className="p-8"> 
          {children}
          
       </div>
    </div>
  )
}

export default Modal

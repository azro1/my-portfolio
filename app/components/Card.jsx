const Card = ({ values, children }) => {
  return (
    <div className={`${values} relative shadow-3xl p-3 rounded-md`}>
       { children }
    </div> 
  )
}

export default Card

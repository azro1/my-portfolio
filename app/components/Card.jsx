const Card = ({ values, children }) => {
  return (
    <div className={`${values} shadow-3xl`}>
       { children }
    </div> 
  )
}

export default Card

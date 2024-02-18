import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Chevron = ({ isOpen, handleToggleMenu, order }) => {

  return (
    <button onClick={handleToggleMenu} className={`${order} p-2 text-base text-secondary shadow-3xl rounded-xl bg-shade lg:hidden`}>
      {isOpen ? (
        <FaChevronUp size={22} />
      ) : (
        <FaChevronDown size={22} />
      )}
    </button>
  )
}

export default Chevron

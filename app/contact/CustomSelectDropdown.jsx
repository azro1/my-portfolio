"use client"

import { useState, useEffect, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const CustomSelectDropdown = ({ label, options, subject, setSubject }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropDownRef = useRef()

    const handleOptionClick = (option) => {
        setSubject(option);
        setDropdownOpen(false);
    };

  // close menu if user clicks on page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target !== dropDownRef.current && dropdownOpen) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen, dropDownRef])

    return (
        <>
            <span className="max-w-min mt-2 mb-2 text-base text-ashGray block">{label}</span>
            <div className="custom-select relative">
                {/* Dropdown header */}
                <div
                    className='w-full py-2.5 px-4 rounded-md outline-none bg-softCharcoal border-[1px] border-ashGray cursor-pointer flex justify-between items-center relative'
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {subject ? (
                        <span className="text-stoneGray">{subject}</span>
                    ) : (
                        <span className="text-ashGray text-opacity-50 h-6"></span>
                    )}

                    <div className='absolute top-0 right-0 w-10 bg-nightSky h-full pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md'>
                        {dropdownOpen ? (
                            <FaCaretUp className="text-stoneGray" size={18} />
                        ) : (
                            <FaCaretDown className="text-stoneGray" size={18} />
                        )}
                    </div>
                </div>

                {/* Dropdown options */}
                {dropdownOpen && (
                    <ul className="absolute w-full bg-nightSky border-[1px] border-ashGray  border-opacity-55  mt-1 z-10" ref={dropDownRef}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="py-2.5 px-4 text-ashGray bg-softCharcoal hover:text-cloudGray hover:bg-midnightSlate/40 cursor-pointer"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>    
        </>

    );
};

export default CustomSelectDropdown;

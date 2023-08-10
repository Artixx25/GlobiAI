import React from 'react'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const Input = ({type, placeholder, value, handleChange, name, info, disabled}) => (
  <div className='w-[80%] relative'>
    <input type={type} value={value} disabled={disabled} onChange={handleChange} name={name} className={`p-3 w-full border-b-[2px] ${disabled && 'opacity-50'} bg-[#ffffff26] backdrop-blur-xl border-b-[#53a717] outline-none text-white font-inter font-light rounded-xl`} placeholder={placeholder} required/>
    {info && <AiOutlineInfoCircle className='text-[#ffffffca] absolute top-1/2 -translate-y-1/2 right-5 text-xl cursor-pointer info-icon'/>}
    {info && (
      <div className='absolute top-1/2 info-div -translate-y-1/2 left-[105%] w-full max-w-[260px] px-2 py-1 rounded-md bg-[#ffffff26] border border-[#ffffff34] backdrop-blur-xl h-auto font-extralight font-inter text-[#ffffffe8]'>
        {info} 
      </div>
    )}
  </div>
  )


export default Input
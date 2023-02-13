import React from 'react'

export default function Input({value, className, type, onChange, name, id, label}) {
  return (
    <label htmlFor={id} className={`flex flex-col  text-xl ${className}`}>
      {label}
      <input
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          id={id}
          className={`p-4 rounded-lg outline-zinc-200 `}
        />
    </label>
  )
}

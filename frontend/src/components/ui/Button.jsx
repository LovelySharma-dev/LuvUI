import React from 'react'

const Button = ({children, className, variant = "primary", ...props}) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20",

     secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",

    ghost:
      "bg-transparent hover:bg-zinc-800 text-zinc-300",
  }
  return (
    <div className={`px-5 py-3 rounded-2xl font-medium transition-all duration-300 hover:translate-y-0.5 active:translate-y-0
    ${variants[variant]} ${className} `} {...props} >
        {children}
    </div>
  )
}

export default Button
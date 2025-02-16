const Button = ({ children, className, ...props }) => {
  return (
    <button className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button


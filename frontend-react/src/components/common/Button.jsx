export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-primary text-gray-900 hover:bg-primary-dark disabled:opacity-50",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
    secondary: "bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

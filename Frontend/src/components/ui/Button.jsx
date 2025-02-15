export const Button = ({ children, onClick, className, disabled }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700'
        } text-white ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };
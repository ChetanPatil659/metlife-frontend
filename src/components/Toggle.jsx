const Toggle = ({ value, onChange, className = '' }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none
        ${value ? 'bg-blue-600' : 'bg-gray-200'}
        ${className}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out
          ${value ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default Toggle; 
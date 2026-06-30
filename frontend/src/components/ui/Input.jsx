const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`
        w-full
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        px-4
        py-3
        text-white
        placeholder:text-zinc-500
        transition-all
        duration-300
        focus:border-indigo-500
        focus:ring-4
        focus:ring-indigo-500/20
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
        p-6
        transition-all
        duration-300
        hover:border-indigo-500/40
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-indigo-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
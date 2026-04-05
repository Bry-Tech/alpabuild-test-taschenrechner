'use client';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'clear';
  className?: string;
}

export default function Button({ label, onClick, variant = 'default', className = '' }: ButtonProps) {
  const baseStyles = 'h-16 text-xl font-semibold rounded-2xl transition-all duration-150 active:scale-95 flex items-center justify-center';
  
  const variants = {
    default: 'bg-gray-800 text-white hover:bg-gray-700',
    operator: 'bg-orange-500 text-white hover:bg-orange-400',
    equals: 'bg-green-600 text-white hover:bg-green-500',
    clear: 'bg-red-500 text-white hover:bg-red-400',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
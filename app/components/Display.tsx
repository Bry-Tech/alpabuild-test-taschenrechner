interface DisplayProps {
  currentValue: string;
  previousValue: string | null;
  operator: string | null;
}

export default function Display({ currentValue, previousValue, operator }: DisplayProps) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-4 min-h-[120px] flex flex-col justify-end items-end">
      <div className="text-gray-400 text-lg h-6">
        {previousValue && operator ? `${previousValue} ${operator}` : ''}
      </div>
      <div className="text-white text-5xl font-light tracking-wide break-all">
        {currentValue}
      </div>
    </div>
  );
}
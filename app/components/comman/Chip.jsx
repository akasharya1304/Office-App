function Chip({ text, bgColor }) {
  return (
    <div
      className={`relative grid select-none ${bgColor || 'bg-gray-500'} items-center w-fit whitespace-nowrap rounded-full
      py-1 px-3 font-sans text-xs font-bold uppercase text-white`}
    >
      <span>{text}</span>
    </div>
  );
}

export default Chip;

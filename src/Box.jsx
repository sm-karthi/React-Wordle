function Box({ letter, color }) {
  return (
    <div
      className={`w-12 h-12 border-2 border-gray-300 flex items-center justify-center font-bold text-xl uppercase ${color} rounded-lg`}>{letter}</div>
  );
}

export default Box;

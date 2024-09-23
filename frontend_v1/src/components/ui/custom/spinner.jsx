const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="w-6 h-6 border-t-4 border-transparent rounded-full border-[1px] border-gradient-animated bg-gradient-to-r from-blue-950 via-blue-500 to-white animate-spin"></div>
    </div>
  );
};

export default Spinner
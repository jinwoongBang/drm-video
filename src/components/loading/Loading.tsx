function Loading() {
  return (
    <div className="relative h-screen w-full z-10">
      <LoadingSpinner />
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-t-2 border-b-2 border-white-900 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;

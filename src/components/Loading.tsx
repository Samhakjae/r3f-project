export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex space-x-2 mb-4">
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      <p className="text-gray-600 text-lg font-medium">로딩 중...</p>
    </div>
  );
}

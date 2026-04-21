export const Error = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-700/50 border border-red-900 text-red-500 p-3 rounded mb-4 text-sm">
      {message}
    </div>
  );
};
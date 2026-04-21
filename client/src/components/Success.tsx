export const Success = ({ message }: { message: string }) => {
  return (
    <div className="bg-green-700/50 border border-green-900 text-green-500 p-3 rounded mb-4 text-sm">
      {message}
    </div>
  );
};
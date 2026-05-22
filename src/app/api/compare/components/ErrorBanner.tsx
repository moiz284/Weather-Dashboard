interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <div className="bg-red-50 border border-red-300 text-red-800 p-5 rounded-2xl shadow-sm mb-6">
      <h2 className="font-bold mb-2">Error</h2>
      <p>{message}</p>
    </div>
  );
}
export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mb-4">
      <div
        className="bg-blue-500 h-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

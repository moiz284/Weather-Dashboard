interface Props {
  insights: string[];
}

export default function InsightPanel({ insights }: Props) {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-2xl font-bold mb-5">
        Generated Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <p className="text-blue-900 font-medium">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
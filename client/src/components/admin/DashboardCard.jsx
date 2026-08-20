export default function DashboardCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-yellow-500/20 bg-black p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.12)]">
      <p className="text-sm text-gray-400">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-yellow-400">{value}</h3>

      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

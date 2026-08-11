type Props = {
  title: string;
  value: string | number;
  valueClassName?: string;
};

function StatCard({
  title,
  value,
  valueClassName = "text-white",
}: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${valueClassName}`}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
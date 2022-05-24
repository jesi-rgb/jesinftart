export default function Attribute({ trait_type, value }) {
  return (
    <div className="flex flex-row space-x-3 bg-slate-600 py-2 px-3 font-body rounded-lg text-xs">
      <span className="text-slate-200">{trait_type}</span>
      <span className="text-slate-400">{value}</span>
    </div>
  );
}

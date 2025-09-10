const SectionTitle = ({ kicker = "", title = "", sub = "" }) => (
  <div className="max-w-3xl">
    {kicker && <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">{kicker}</p>}
    <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
    {sub && <p className="mt-3 text-gray-600 leading-relaxed">{sub}</p>}
  </div>
);

export default SectionTitle;
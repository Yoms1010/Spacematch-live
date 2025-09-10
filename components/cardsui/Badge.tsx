const Badge = ({ children }: {children: React.ReactNode}) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 bg-white/70 backdrop-blur">
    {children}
  </span>
);

export default Badge;
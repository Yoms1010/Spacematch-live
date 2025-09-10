// components/Header.js
import Link from 'next/link';

const Header = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="bg-gray-800 text-center p-6">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-white px-6 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default Header;
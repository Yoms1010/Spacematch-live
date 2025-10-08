// components/Header.js

const Header = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="bg-gray-200 text-center px-5 py-3">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="px-6 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default Header;
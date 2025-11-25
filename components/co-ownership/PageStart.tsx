const PageStart = ({ onNext }: {onNext: any}) => (
    <div className="text-center">
        {/*  */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Ownership Plan</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">Find trusted partners and acquire your dream property together. Let's begin by defining what you're looking for.</p>
        <button 
            onClick={() => onNext('page-goals')} 
            className="action-btn bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
            Define Your Co-Ownership Goals
        </button>
    </div>
);

export default PageStart;
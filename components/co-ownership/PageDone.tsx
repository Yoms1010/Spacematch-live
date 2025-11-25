const PageDone = ({ onNext }: { onNext: any }) => (
    <div className="text-center">
        {/*  */}
        <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">You are now the proud co-owner of "10 Plots, Epe". Your project is officially underway.
        </p>
        <button 
            onClick={() => onNext('page-start')}
            className="action-btn bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition duration-300"
        >
            Back to Home
        </button>
    </div>
);

export default PageDone;
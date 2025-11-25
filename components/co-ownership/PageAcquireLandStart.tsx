const PageAcquireLandStart = ({ onNext, userState }: { onNext:any, userState: any}) => {
    // Simple budget doubling simulation
    const userBudget = parseInt(userState.goals.budget.replace('₦', '').replace(/,/g, ''));
    const combinedBudget = `₦${(userBudget * 2).toLocaleString()}`;
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Acquire Your Land</h2>
            <p className="text-gray-600 mb-6">
                Congratulations! Your partnership is formalized and the deposit is secured. Now, let's find the perfect piece of land for your project.
            </p>
            {/* NO REPETITION: Data is pulled from the previous flow */}
            <div className="border rounded-lg p-6 bg-main-10 shadow-inner border-blue-200">
                <h3 className="font-semibold text-lg text-main-100 mb-4">Your Project Brief</h3>
                <p className="text-main-100"><span className="font-medium">Partners:</span> You & {userState.partner}</p>
                <p className="text-main-100"><span className="font-medium">Project Type:</span> {userState.goals.projectType}</p>
                <p className="text-main-100"><span className="font-medium">Target Location:</span> {userState.goals.location}</p>
                <p className="text-main-100"><span className="font-medium">Combined Budget:</span> {combinedBudget}</p>
            </div>
            <button 
                onClick={() => onNext('page-acquire-land-listings')}
                className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Search Land Listings
            </button>
        </div>
    );
};

export default PageAcquireLandStart;
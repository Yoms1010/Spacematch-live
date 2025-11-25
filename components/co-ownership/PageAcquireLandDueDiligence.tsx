const PageAcquireLandDueDiligence = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Due Diligence</h2>
        <p className="text-gray-600 mb-6">You've selected "10 Plots, Epe". Now, complete the due diligence checklist with your partners.</p>
        <div className="border rounded-lg p-6 bg-gray-50 shadow-inner">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Due Diligence Checklist</h3>
            <ul className="space-y-3">
                <li className="flex items-center">
                    <input type="checkbox" id="dd1" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd1" className="ml-3 text-gray-700">Order Property Survey</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd2" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd2" className="ml-3 text-gray-700">Complete Title Search (C of O)</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd3" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd3" className="ml-3 text-gray-700">Verify Zoning & Restrictions</label>
                </li>
                <li className="flex items-center">
                    <input type="checkbox" id="dd4" className="h-5 w-5 rounded text-main-100 border-gray-300 focus:ring-main-100" />
                    <label htmlFor="dd4" className="ml-3 text-gray-700">Conduct Soil & Water Tests</label>
                </li>
            </ul>
        </div>
        <button 
            onClick={() => onNext('page-acquire-land-finalize')}
            className="action-btn w-full mt-6 bg-main-100 hover:bg-main-100 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Mark as Complete & Initiate Purchase
        </button>
    </div>
);

export default PageAcquireLandDueDiligence;
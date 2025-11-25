const PageAcquireLandListing = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Land Listings Matching Your Goals</h2>
        <p className="text-gray-600 mb-6">Based on your brief, here are the top 3 matches. (Simulation)</p>
        <div className="space-y-4">
            {/* Mock Listing 1 */}
            <div className="border border-blue-300 bg-main-10 p-4 rounded-lg flex items-center justify-between shadow-sm ring-2 ring-main-100">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/100x80/A5B4FC/312E81?text=Land" alt="Land" className="w-24 h-20 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">10 Plots, Epe</h3>
                        <p className="text-gray-600">Location: <span className="font-medium text-gray-800">Epe, Lagos</span>.</p>
                        <p className="text-lg font-bold text-main-100">₦130,000,000</p>
                    </div>
                </div>
                <button 
                    onClick={() => onNext('page-acquire-land-due-diligence')}
                    className="action-btn bg-main-100 hover:bg-main-100 text-white font-bold py-2 px-5 rounded-lg shadow transition duration-300"
                >
                    Select
                </button>
            </div>
            {/* Mock Listing 2 */}
            <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between shadow-sm opacity-80">
                <div className="flex items-center space-x-4">
                    <img src="https://placehold.co/100x80/E0E7FF/4F46E5?text=Land" alt="Land" className="w-24 h-20 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">2 Plots, Ibeju-Lekki</h3>
                        <p className="text-gray-600">Location: <span className="font-medium text-gray-800">Ibeju-Lekki, Lagos</span>.</p>
                        <p className="text-lg font-bold text-main-100">₦90,000,000</p>
                    </div>
                </div>
                <button className="bg-gray-300 text-gray-600 font-bold py-2 px-5 rounded-lg cursor-not-allowed">Select</button>
            </div>
        </div>
    </div>
);

export default PageAcquireLandListing;
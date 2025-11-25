const PageAcquireLandFinalize = ({ onNext }: { onNext: any }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Finalize Acquisition</h2>
        <p className="text-gray-600 mb-6">All checks are complete. Review the final purchase agreement and complete the acquisition.</p>
        <div className="border rounded-lg p-6 bg-green-50 shadow-inner border-green-200">
            <h3 className="font-semibold text-lg text-green-800 mb-4">Final Purchase Summary</h3>
            <p className="text-green-700"><span className="font-medium">Property:</span> 10 Plots, Epe</p>
            <p className="text-green-700"><span className="font-medium">Final Price:</span> ₦130,000,000</p>
            <p className="text-green-700"><span className="font-medium">Your Share (50%):</span> ₦65,000,000</p>
            <p className="text-green-700"><span className="font-medium">Partner Share (50%):</span> ₦65,000,000</p>
            <p className="text-green-700 mt-4"><span className="font-medium">Closing Date:</span> Est. 30 Days</p>
        </div>
        <button 
            onClick={() => onNext('page-done')}
            className="action-btn w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
            Sign & Complete Acquisition
        </button>
    </div>
);

export default PageAcquireLandFinalize;
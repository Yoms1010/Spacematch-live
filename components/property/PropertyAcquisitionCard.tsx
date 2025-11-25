import { PropertyCardProps } from "@/types";


const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

const PropertyAcquisitionCard: React.FC<PropertyCardProps> = ({ property, onSave, onCompare, onRequestInfo, isComparing } : { property: any, onSave: any, onCompare: any, onRequestInfo: any, isComparing: any }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1.5 hover:shadow-xl">
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${property.property_image[0].path}`} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <LocationIcon />
                    <span>{property.title}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">{property.city}, {property.country} - {property.squareMeters} sqM</p>

                <div className="mt-4">
                    <h4 className="font-bold text-gray-800 mb-2">Match Preferences:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        {property.match_preference.map((pref: any, index: number) => (
                            <li key={index}>
                                <CheckIcon />
                                <span>{pref.preferences}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 flex space-x-2">
                    <button
                        onClick={() => onSave(property.id, property.title)}
                        className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => onCompare(property.id)}
                        className={`flex-1 font-semibold py-2 px-4 rounded-md transition-colors ${
                            isComparing
                                ? 'bg-blue-200 text-blue-800 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        disabled={true}
                    >
                        {isComparing ? 'Added to Compare' : 'Compare'}
                    </button>
                </div>
                <button
                    onClick={() => onRequestInfo(property.id)}
                    className="w-full mt-4 bg-purple-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-purple-700 transition-colors"
                >
                    Request More Info
                </button>
            </div>
        </div>
    );
};


export default PropertyAcquisitionCard;
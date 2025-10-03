import Badge from "./Badge";

interface PropertyCardProps{
    id: number
    verified: boolean, 
    type: string, 
    city: string, 
    title: string, 
    vendor: string, 
    price: number, 
    area: number;
    key: number; 
}

function PropertyCard({ verified, type, city, title, vendor, price, area }: PropertyCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="h-40 w-full overflow-hidden">
        <img className="h-full w-full object-cover group-hover:scale-105 transition"
             alt={title}
             src={`https://source.unsplash.com/collection/483251/640x360?sig=${encodeURIComponent(title)}`} />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {verified && <Badge>Verified Docs</Badge>}
            <Badge>{type}</Badge>
          </div>
          <span className="text-sm text-gray-500">{city}</span>
        </div>
        <h4 className="mt-2 font-semibold text-gray-900">{title} <span className="font-normal text-gray-600">by {vendor}</span></h4>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">${price.toLocaleString()} • {area.toLocaleString()} m²</div>
          <button className="text-main-100 hover:text-main-100 text-sm font-semibold">View</button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
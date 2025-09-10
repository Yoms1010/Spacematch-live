// components/SolutionCard.js
import Image from 'next/image';
import Link from 'next/link';

interface SolutionCardProps{
    title: string,
    description: string,
    imageSrc: string,
    imageAlt: string,
    reverse: boolean
}

const SolutionCard = ({ title, description, imageSrc, imageAlt, reverse }: SolutionCardProps) => {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} bg-gray-900 rounded-lg shadow-md overflow-hidden`}>
      <div className="md:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={400}
          layout="responsive"
          objectFit="cover"
          className='h-[400px] rounded-tl-2xl rounded-br-2xl'
        />
      </div>
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <Link href={{
            pathname: "/products/solutions",
            query: {type: title == "FlexiHabitat" ? "flexihabitat" : title == "TerraTribe" ? "terratribe" : "rootsmanor"}
        }} 
        className="text-white hover:text-main-100/80 transition-colors text-center border p-3 rounded hover:border-main-100 font-semibold">
          Check it Out
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;
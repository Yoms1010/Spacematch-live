// pages/index.js
// import Header from '@/components/cardsui/Header';
import Header from '@/components/cardsui/Header';
import SolutionCard from '@/components/cardsui/SolutionCard';
import Head from 'next/head';


const ProductSolutions = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-28 pb-32">
      <Head>
        <title>Our Solutions</title>
        <meta name="description" content="Explore our innovative living solutions." />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <Header
            title='Our Product Solutions'
            description='Explore Our Property Solutions'
        />
        <div className="container mx-auto p-4 md:p-8 space-y-8">
          <SolutionCard
            title="FlexiHabitat"
            description="Smart prefab homes designed to fit your lifestyle, built on leased land so you can live where you want, how you want without the heavy price tag. Perfect for homeowners or entrepreneurs looking to start an Airbnb with minimal budget and time investment."
            imageSrc="/solutions/products/flexi-habitat.jpeg"
            imageAlt="A modern modular home on a lake."
            reverse={false}
          />

          <SolutionCard
            title="TerraTribe"
            description="A new way to own homes together. Our intelligent matchmaker connects people with shared preferences, location, budget, lifestyle and brings them together to co-own homes on shared land. Join the tribe that’s redefining property ownership."
            imageSrc="/solutions/products/terra-tribe.jpeg"
            imageAlt="Architects working on a building model."
            reverse={true}
          />

          <SolutionCard
            title="RootsManor"
            description="RootsManor empowers diaspora communities to build high-quality, bespoke brick-and-mortar homes without relying on unreliable developers or family promises. Through a transparent, milestone-based system, clients purchase materials directly and only release funds as contractors deliver and satisfy each project stage — ensuring trust, control, and craftsmanship from start to finish."
            imageSrc="/solutions/products/roots-manor.jpeg"
            imageAlt="Two people looking at a 3D architectural design on a computer."
            reverse={false}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductSolutions;
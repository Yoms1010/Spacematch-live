import Image from 'next/image';
import React, { useState } from 'react'
import "react-multi-carousel/lib/styles.css";
import PrefabHomesModal from './PrefabHomesModal';

function PrefabHomes() {

  const [imageOne, setImageOne] = useState<any>("")
  const [imageTwo, setImageTwo] = useState<any>("")
  const [imageThree, setImageThree] = useState<any>("")

  const [openModal, setOpenModal] = useState<boolean>(false)
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  let solutions = [
    {
      title: "Studio",
      img: [
            "/solutions/prefab/studio-pc-one.jpg",
            "/solutions/prefab/studio-pc-two.jpg",
         ],
      mobilebg: "max-sm:bg-[url(/carousel/mobile-one.jpg)]",
      desc: "",
      cost: 3450000
    },
    {
      title: "One Bed",
      img: [
            "/solutions/prefab/studio-pc-one.jpg",
            "/solutions/prefab/studio-pc-two.jpg",
         ],
      mobilebg: "max-sm:bg-[url(/carousel/mobile-two.jpg)]",
      desc: "",
      cost: 7450000
    },
    {
      title: "Two Beds",
      img: [
            "/solutions/prefab/studio-pc-one.jpg",
            "/solutions/prefab/studio-pc-two.jpg",
         ],
      bg: "lg:bg-[url(/carousel/new-3.jpg)]",
      mobilebg: "max-sm:bg-[url(/carousel/mobile-three.jpg)]",
      desc: "",
      cost: 14500000
    },    
  ];

  function handlePrefab(item: {}): void {
    setOpenModal(true)
    // return alert("Under Construction");
  }

  return (
    <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3 pt-[100px] p-5'>
      <div className='flex flex-col justify-center items-center gap-2 bg-white p-5 w-full'>
        <div className='text-center font-semibold text-xl'>{solutions[0].title}</div>
        <div className='flex flex-col justify-center items-center gap-5 w-full'>
          {
            solutions[0].title
              &&
            <Image
              src={`${imageOne ? imageOne : solutions[0].img[0]}`}
              width={500}
              height={300}
              alt=''
              className='rounded shadow-md'
            />
          }
          <div className='flex justify-center items-center space-x-3 w-full'>
            {
              solutions[0].img.map((img, i) => (
                <Image
                  key={i}
                  src={`${img}`}
                  width={150}
                  height={150}
                  alt=''
                  className='border-2 hover:border-main-100 rounded cursor-pointer'
                  onClick={() => setImageOne(img)}
                />
              ))
            }
          </div>
        </div>
        <button 
          onClick={() => handlePrefab(solutions[0])}
          className="flex justify-center items-center p-2 bg-main-100 w-full rounded hover:shadow-lg text-white"
        >
          Proceed with studio
        </button>
      </div>

      <div className='bg-white p-5'>
        <div className='text-center font-semibold text-xl'>{solutions[1].title}</div>
        <div className='flex flex-col justify-center gap-5'>
          {
            solutions[1].title
              &&
            <Image
              src={`${imageTwo ? imageTwo : solutions[1].img[0]}`}
              width={500}
              height={300}
              alt=''
              className='rounded shadow-md'
            />
          }
          <div className='flex justify-center items-center space-x-3 w-full'>
            {
              solutions[1].img.map((img, i) => (
                <Image
                  key={i}
                  src={`${img}`}
                  width={150}
                  height={150}
                  alt=''
                  className='border-2 hover:border-main-100 rounded cursor-pointer'
                  onClick={() => setImageTwo(img)}
                />
              ))
            }
          </div>
        </div>
      </div>

      <div className='bg-white p-5'>
        <div className='text-center font-semibold text-xl'>{solutions[2].title}</div>
        <div className='flex flex-col justify-center gap-5'>
          {
            solutions[2].title
              &&
            <Image
              src={`${imageThree ? imageThree : solutions[2].img[0]}`}
              width={500}
              height={300}
              alt=''
              className='rounded shadow-md'
            />
          }
          <div className='flex justify-center items-center space-x-3 w-full'>
            {
              solutions[2].img.map((img, i) => (
                <Image
                  key={i}
                  src={`${img}`}
                  width={150}
                  height={150}
                  alt=''
                  className='border-2 hover:border-main-100 rounded cursor-pointer'
                  onClick={() => setImageThree(img)}
                />
              ))
            }
          </div>
        </div>
      </div>

      <PrefabHomesModal openModal={openModal} setOpenModal={setOpenModal} homeData={3400000}/>
    </div>
  )
}

export default PrefabHomes

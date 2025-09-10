import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CustomCarousel() {

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

  let slides = [
    {
      bg: "lg:bg-[url(/carousel/slide-1.jpg)]",
      mobilebg: "max-sm:bg-[url(/carousel/slider-mob-1.jpeg)]",
      desc: ""
    },
    {
      bg: "lg:bg-[url(/carousel/slide-2.jpg)]",
      mobilebg: "max-sm:bg-[url(/carousel/slider-mob-2.jpeg)]",
      desc: ""
    },
    {
      bg: "lg:bg-[url(/carousel/slide-3.jpg)]",
      mobilebg: "max-sm:bg-[url(/carousel/slider-mob-3.jpeg)]",
    },
    {
      bg: "lg:bg-[url(/carousel/slide-4.jpeg)]",
      mobilebg: "max-sm:bg-[url(/carousel/slider-mob-4.jpeg)]",
    },
    // {
    //   bg: "lg:bg-[url(/carousel/slide-5.jpg)]",
    //   mobilebg: "max-sm:bg-[url(/carousel/slider-mob-2.jpeg)]",
    //   desc: ""
    // },
    
  ];


  return (
    <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={ true }
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={2000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px space-x-3"
    >
        {/* <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"> */}
            {slides.map((slide, i) => (
              <div key={i} className="transition duration-200 delay-150 ease-in-out rounded-lg border bg-background shadow-2xl h-[100vh]">
                <div className={`h-[100vh] text-white text-center grid lg:bg-center bg-no-repeat max-sm:bg-center ${slide.bg} ${slide.mobilebg}`}>
                    <div className="col-start-1 row-start-1 bg-blue-950/20 w-full h-full"></div>
                    <div className="col-start-1 z-50 row-start-1 my-auto">
                      <div className='text-2xl max-sm:text-xl font-bold my-4 text-center'></div>
                        {/* <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-1 px-5'> */}
                          <div className='flex justify-center items-center'>
                            <div className="text-left mb-3 text-32 max-sm:text-md">{slide.desc}</div>
                          </div>
                        {/* </div> */}
                    </div>
                  </div>
              </div>
            ))}
        {/* </div> */}
    </Carousel>
  )
}

export default CustomCarousel

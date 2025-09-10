import { HomeHeaderBoxProps } from "@/types"
import { Button } from "./ui/button"



const HomeHeaderBox = ({vendor, client, title, subtext, children} : HomeHeaderBoxProps ) => {
    return (
      <div className="home-header-box">
        <h1 className="home-header-box-title tracking-wide">
          {/* <div>{vendor}</div>
          <div>{client}</div> */}
          {title}
        </h1>
        <div className="home-header-box-subtext ">{subtext}</div>
        <div className="home-header-box-btn">
            {children}
        </div>
      </div>
    )
  }
  
  export default HomeHeaderBox
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "./../../../assets/assets/home/01.jpg";
import img2 from "./../../../assets/assets/home/02.jpg";
import img3 from "./../../../assets/assets/home/03.png";
import img4 from "./../../../assets/assets/home/04.jpg";

const Banner = () => {
  return (
    <Carousel showArrows={true} autoPlay={true}>
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
    </Carousel>
  );
};

export default Banner;

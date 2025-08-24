import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 4 }, // Now 4 visible on desktop
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const sidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const sideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data
    .slice(0, 10)
    .map((item, i) => <HomeSectionCard key={i} product={item} />);

  return (
    <div className="bg-white rounded-lg shadow shadow-gray-500 p-5">
      <h2 className="text-2xl font-extrabold text-gray-900">{sectionName}</h2>
      <div className="relative mx-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== items.length - 4 && (
          <Button
            variant="contained"
            className="z-50 bg-white shadow"
            onClick={sideNext}
            sx={{
              position: "absolute",
              top: "50%",                // center vertically
              right: "0rem",             // for next button
              transform: "translate(50%, -50%) rotate(90deg)", // shift up by 50% of its height
              bgcolor: "white",
            }}

            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
        {activeIndex !== 0 && (
          <Button
            variant="contained"
            className="z-50 bg-white shadow"
            onClick={sidePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0rem",              // for prev button
              transform: "translate(-50%, -50%) rotate(-90deg)",
              bgcolor: "white",
            }}

            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;

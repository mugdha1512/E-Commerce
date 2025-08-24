import { dress } from "../../../Data/dress/dress";
import { gouns } from "../../../Data/Gouns/gouns";
import { mens_kurta } from "../../../Data/Men/mens_kurta";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";

export default function HomePage() {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-5 flex flex-col justify-center lg:px-10">
        <HomeSectionCarousel data={mens_kurta} sectionName={"Men's Kurta"} />
        <HomeSectionCarousel data={dress} sectionName={"Women's Dress"} />
        <HomeSectionCarousel data={gouns} sectionName={"Women's Gouns"} />
        {/* <HomeSectionCarousel data={pants} sectionName={"Men's Pants"} /> */}
      </div>
    </div>
  );
}

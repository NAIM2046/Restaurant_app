import { useEffect, useState } from "react";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import MenuIten from "../../SharePage/MenuItem/MenuIten";
import useMenu from "../../../useMenu/useMenu";

const PopularMenu = () => {
  const [menu, loading] = useMenu();

  const popularItems = menu.filter((item) => item.category === "popular");

  //console.log(menu);
  return (
    <div>
      <section>
        <SectionTitle
          heading={"From our menu"}
          subHeading={"Popular Items"}
        ></SectionTitle>

        <div className="grid md:grid-cols-2 gap-10">
          {popularItems.map((item) => (
            <MenuIten key={item._id} item={item}></MenuIten>
          ))}
        </div>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          View Full Menu
        </button>
      </section>
    </div>
  );
};

export default PopularMenu;

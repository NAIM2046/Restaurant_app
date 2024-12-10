import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../SharePage/Cover/Cover";
import PopularMenu from "../Home/PopularMenu/PopularMenu";
import menuImg from "../../assets/assets/menu/menu-bg.jpg";
import dessertImg from "../../assets/assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/assets/menu/salad-bg.jpg";
import soupImg from "../../assets/assets/menu/soup-bg.jpg";

import MenuCategorg from "./MenuCategorg";
import useMenu from "../../useMenu/useMenu";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
const Menu = () => {
  const [menu] = useMenu();
  console.log(menu);
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss|Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu"></Cover>
      <SectionTitle
        subHeading="Don't Miss"
        heading="Today's offer"
      ></SectionTitle>
      <MenuCategorg items={offered}></MenuCategorg>
      <MenuCategorg
        items={dessert}
        title="Desserts"
        img={dessertImg}
      ></MenuCategorg>
      <MenuCategorg items={salad} title="Salad" img={saladImg}></MenuCategorg>
      <MenuCategorg items={soup} title="Soup" img={soupImg}></MenuCategorg>
      <MenuCategorg items={pizza} title="Pizza" img={pizzaImg}></MenuCategorg>
    </div>
  );
};

export default Menu;

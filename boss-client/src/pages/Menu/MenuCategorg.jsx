import React from "react";
import Cover from "../SharePage/Cover/Cover";
import MenuIten from "../SharePage/MenuItem/MenuIten";
import { Link } from "react-router-dom";

const MenuCategorg = ({ items, title, img }) => {
  return (
    <div className="mt-8">
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-10 my-10">
        {items.map((item) => (
          <MenuIten key={item._id} item={item}></MenuIten>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategorg;

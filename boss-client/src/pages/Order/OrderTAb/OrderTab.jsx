import FoodCard from "../../../component/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4  flex-col justify-center ">
      {items.map((item) => (
        <FoodCard item={item}> </FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;

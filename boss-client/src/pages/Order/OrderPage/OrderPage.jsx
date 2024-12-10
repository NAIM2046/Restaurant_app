import { useState } from "react";
import Cover from "../../SharePage/Cover/Cover";
import OrderImg from "./../../../assets/assets/shop/order.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../useMenu/useMenu";
import OrderTab from "../OrderTAb/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderPage = () => {
  const categorys = ["Salad", "Pizza", "Soup", "Dessert", "Drinks"];
  const { category } = useParams() || {};
  const inishallindex =
    categorys.indexOf(category) !== -1 ? categorys.indexOf(category) : 0;
  const [tabIndex, setTabIndex] = useState(inishallindex);
  const [menu] = useMenu() || [];

  const filteredItems = {
    salad: menu.filter((item) => item.category === "salad"),
    pizza: menu.filter((item) => item.category === "pizza"),
    soup: menu.filter((item) => item.category === "soup"),
    dessert: menu.filter((item) => item.category === "dessert"),
    drinks: menu.filter((item) => item.category === "drinks"),
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order</title>
      </Helmet>
      <Cover img={OrderImg} title="Order Now" />
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={filteredItems.salad} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={filteredItems.pizza} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={filteredItems.soup} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={filteredItems.dessert} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={filteredItems.drinks} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderPage;

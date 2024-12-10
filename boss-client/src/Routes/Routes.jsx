import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import OrderPage from "../pages/Order/OrderPage/OrderPage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Card from "../pages/Dashboard/Card";
import AllUsers from "../Layout/AllUsers/AllUsers";
import AdminRout from "./AdminRout";
import AddItam from "../pages/Dashboard/AddItam";
import ManageItems from "../pages/Dashboard/ManageItems";
import UpdataItem from "../pages/Dashboard/UpdataItem";
import Payment from "../pages/Dashboard/Payment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <OrderPage></OrderPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "card",
        element: <Card></Card>,
      },

      {
        path: "payment",
        element: <Payment></Payment>,
      },

      //admin router
      {
        path: "users",
        element: (
          <AdminRout>
            <AllUsers></AllUsers>
          </AdminRout>
        ),
      },
      {
        path: "addItems",

        element: (
          <AdminRout>
            <AddItam></AddItam>
          </AdminRout>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRout>
            <ManageItems></ManageItems>
          </AdminRout>
        ),
      },
      {
        path: "updataItem/:id",
        element: (
          <AdminRout>
            <UpdataItem></UpdataItem>
          </AdminRout>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5001/menu/${params.id}`),
      },
    ],
  },
]);

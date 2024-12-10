import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../useMenu/useAxiosSecure";
import useCards from "../../useMenu/useCards";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const negevite = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCards();
  const handleAddcard = (food) => {
    if (user && user.email) {
      const cardItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/card", cardItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          alert("Added card");
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Login",
        text: "Pleace login now ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes , Login",
      }).then((result) => {
        if (result.isConfirmed) {
          negevite("/login");
        }
      });
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={image} alt="FoodItem" />
      </figure>
      <p className=" absolute right-0 bg-black text-white mr-4 mt-4 p-1">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              handleAddcard(item);
            }}
            className="btn btn-outline border-0 border-b-4 mt-4"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

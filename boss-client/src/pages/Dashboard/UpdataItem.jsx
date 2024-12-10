import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import React, { useState } from "react";
import useAxiosPublic from "../../useMenu/useAxiosPublic";
import useAxiosSecure from "../../useMenu/useAxiosSecure";

const image_hosting_key = "c6a562004bff421926419e6b22cec40e";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdataItem = () => {
  const updataItem = useLoaderData();
  console.log("updata", updataItem);

  const { name, recipe, image, category, price, _id } = updataItem;
  console.log({ name, recipe, image, category, price, _id });
  const [sname, setName] = useState(name);
  const [description, setDescription] = useState("");
  const [sprice, setPrice] = useState(price);
  const [scategory, setCategory] = useState(category);
  const [simage, setImage] = useState(null); // Changed [] to null
  const [imageurl, setImageurl] = useState(image); // Changed [] to null
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = imageurl; // Use the existing image URL if no new image is uploaded

    // Check if there's a new image to upload
    if (simage) {
      try {
        const formData = new FormData();
        formData.append("image", simage);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded successfully:", res.data);
        if (res.data.success) {
          uploadedImageUrl = res.data.data.display_url; // Set the new image URL
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Exit early if there's an error uploading the image
      }
    }

    // Construct menuItem with the latest image URL
    const menuItem = {
      name: sname,
      category: scategory,
      price: sprice,
      recipe: description,
      image: uploadedImageUrl, // Use the updated image URL
    };

    console.log("Updated menu item:", menuItem);

    try {
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        alert("Item updated successfully in the database");
      }
    } catch (error) {
      console.error("Error updating item in the database:", error);
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"Update Item "}
        subHeading={"Refresh Info"}
      ></SectionTitle>

      <div>
        <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-6 md:mt-10 p-4 md:p-6 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Item Name</label>
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter item name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                defaultValue={recipe}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter item description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                defaultValue={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter item price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="drinks">drinks</option>

                <option value="dessert">Dessert</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-lg hover:bg-blue-600"
            >
              Update Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdataItem;

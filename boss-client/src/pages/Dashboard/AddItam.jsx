import React, { useState } from "react";
import useAxiosPublic from "../../useMenu/useAxiosPublic";
import useAxiosSecure from "../../useMenu/useAxiosSecure";

const image_hosting_key = "c6a562004bff421926419e6b22cec40e";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Changed [] to null
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure an image file has been selected
    if (!image) {
      console.error("Please select an image file");
      return;
    }

    // Use FormData to properly format the file for upload
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", res.data);
      if (res.data.success) {
        const menuItem = {
          name: name,
          category: category,
          price: price,
          recipe: description,
          image: res.data.data.display_url,
        };
        console.log(menuItem);
        const menuRes = await axiosSecure.post("/menu", menuItem);
        console.log(menuRes.data);
        if (menuRes.data.insertedId) {
          e.target.reset();
          alert("add Item database successfully");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-6 md:mt-10 p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
        Add New Menu Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter item name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter item description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter item price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 md:px-4 md:py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
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
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItam;

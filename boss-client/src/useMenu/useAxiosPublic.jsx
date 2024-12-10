import axios from "axios";
import React from "react";
const AxiosPublic = axios.create({
  baseURL: "http://localhost:5001",
});
const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;

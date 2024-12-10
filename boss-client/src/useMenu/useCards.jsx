import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useCards = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: card = [] } = useQuery({
    queryKey: ["card", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cards?email=${user?.email}`);
      return res.data;
    },
  });
  return [card, refetch];
};

export default useCards;

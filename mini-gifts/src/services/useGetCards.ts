import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { BASE_URL, TOKEN } from "../constants";

interface Options {
  countryISO: string;
}

const config = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};
export const getCards = (requestDetails: any) => {
  return axios
    .post(`${BASE_URL}/transactions/listGiftVoucher`, requestDetails, config)
    .then(
      (response) => {
        if (response.status == 200) {
          return response.data.data;
        }
      },
      (error) => {
        toast(error, { type: "error" });
      }
    );
};

export const useGetCards = () => {
  return useMutation(getCards);
};
